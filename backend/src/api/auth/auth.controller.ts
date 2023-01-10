import type { NextFunction, Request, Response } from "express";
import { User, UserWithId, Users } from "../user/user.model";
import { createAccessToken, getHashedPassword } from "./auth.helpers";
import cookiesConfig from "../../config/cookiesConfig";
import { MongoServerError } from "mongodb";

export async function register(
  req: Request<{}, UserWithId, User & { department: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    res.status(400);
    const { body } = req;
    const department =
      typeof body.department === "string"
        ? parseInt(body.department)
        : body.department;
    const validateResult = User.parse({
      ...req.body,
      department,
    });

    // look for users with the same email or username
    const user = await Users.findOne({
      email: validateResult.email,
    });

    if (user !== null) {
      return res.status(400).json({
        message: "El correo electrónico ya fue registrado",
        field: "email",
      });
    }

    //  hash password
    validateResult.password = await getHashedPassword(validateResult.password);

    // Save user on db
    const insertResult = await Users.insertOne(validateResult, {});
    if (!insertResult.acknowledged) throw new Error("Error inserting user");

    // Create access token with userId and email as payload
    const accessToken = createAccessToken(
      insertResult.insertedId,
      validateResult.email,
    );

    // Create access token cookie and send it to the client
    res.cookie(cookiesConfig.access.name, accessToken);

    res.status(201).json({
      message: "El usuario ha sido creado",
    });
  } catch (err) {
    if (err instanceof MongoServerError) {
      return res.status(400).json({
        message: "El correo electrónico ya fue registrado",
        stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
        field: err.message.includes("username") ? "username" : "email",
      });
    }
    next(err);
  }
}
