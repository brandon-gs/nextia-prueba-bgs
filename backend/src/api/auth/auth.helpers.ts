import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import jwtConfig from "../../config/jwtConfig";

export async function getHashedPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function matchPassword(hashPassword: string, password: string) {
  const matches = await bcrypt.compare(password, hashPassword);
  return matches;
}

export function createAccessToken(
  id: ObjectId,
  email: string,
  expiresIn = "1d",
) {
  return jwt.sign({ _id: id, email }, jwtConfig.ACCESS_SECRET!, {
    expiresIn,
  });
}

export function decodeUserFromToken(token: string) {
  return jwt.verify(token, jwtConfig.ACCESS_SECRET!) as {
    _id: ObjectId;
    email: string;
  };
}
