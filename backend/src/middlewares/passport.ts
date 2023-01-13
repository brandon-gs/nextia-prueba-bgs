import type { NextFunction, Request, Response } from "express";
import passport from "passport";
import cookiesConfig from "../config/cookiesConfig";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      res.clearCookie(cookiesConfig.access.name, cookiesConfig.access.delete);
      return res.status(401).json({ message: "Sesión caducada" }); // send the error response to client
    }
    req.user = user;
    return next(); // continue to next middleware if no error.
  })(req, res, next);
};
export const requireLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(422).json({ message: "Credenciales incorrectas" });
    }
    req.user = user;
    return next();
  })(req, res, next);
};
