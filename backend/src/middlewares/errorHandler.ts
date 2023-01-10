import type { NextFunction, Request, Response } from "express";
import ErrorResponse from "../types/ErrorResponse";
import { ZodError } from "zod";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      validationErrors: err.issues.map((issue) => ({
        path: issue.path,
        fieldname: issue.path[2],
        message: issue.message,
      })),
    });
  }
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}
