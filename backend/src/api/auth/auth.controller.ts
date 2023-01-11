import type { NextFunction, Request, Response } from "express";
import { User, UserWithId, Users } from "../user/user.model";
import {
  createAccessToken,
  decodeUserFromToken,
  getHashedPassword,
} from "./auth.helpers";
import cookiesConfig from "../../config/cookiesConfig";
import { MongoServerError } from "mongodb";
import sendResetPasswordEmail from "../../services/nodemailer/mails/sendResetPasswordEmail";
import { JsonWebTokenError } from "jsonwebtoken";
import { EmailSchema, PasswordSchema } from "./auth.schemas";

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
      _id: insertResult.insertedId,
      department: validateResult.department,
      firstname: validateResult.firstname,
      lastname: validateResult.lastname,
      email: validateResult.email,
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

export function login(req: Request, res: Response) {
  const user = req.user as UserWithId;

  const accessToken = createAccessToken(user._id, user.email);

  res.cookie(cookiesConfig.access.name, accessToken);

  res.status(200).json(user);
}

export function logout(req: Request, res: Response) {
  res.clearCookie(cookiesConfig.access.name);
  res.status(200).json({});
}

export async function forgotPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email } = req.body;
    const validatedEmail = EmailSchema.parse({ email });
    const user = await Users.findOne({ email: validatedEmail.email });
    if (user === null) {
      res.status(400);
      throw new Error("Usuario no encontrado con este correo");
    }
    await sendResetPasswordEmail(user._id, user.firstname, user.email);
    res.status(200).json({ message: "Correo enviado exitosamente" });
  } catch (error) {
    next(error);
  }
}

export async function recoverPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { token, from } = req.query;
  try {
    if (typeof token !== "string") {
      res.status(400);
      throw new Error("Operacion inválida");
    }
    /**
     * This will throw an error if the token is invalid
     */
    const user = decodeUserFromToken(token);

    /**
     * Continue to update the password
     */
    const { password } = req.body;

    /**
     * This will throw an error if password doesnt match the requirements
     */
    const validatedPassword = PasswordSchema.parse({ password });

    //  hash password
    validatedPassword.password = await getHashedPassword(
      validatedPassword.password,
    );

    await Users.updateOne(
      { email: user.email },
      { $set: { password: validatedPassword.password } },
    );
    res.status(200).json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    const messageErrors: Record<string, string> = {
      "reset-password": "El link ha expirado",
    };
    const currentMessageError =
      typeof from === "string" && messageErrors[from]
        ? messageErrors[from]
        : "Operación inválida";
    if (error instanceof JsonWebTokenError) {
      res.status(400);
      next(new Error(currentMessageError));
    }
    next(error);
  }
}
