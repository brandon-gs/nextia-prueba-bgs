import { ObjectId } from "mongodb";
import passport from "passport";
import { Strategy as JwtStrategy, type StrategyOptions } from "passport-jwt";
import passportLocal from "passport-local";
import { Users } from "../api/user/user.model";
import { matchPassword } from "../api/auth";
import cookiesConfig from "../config/cookiesConfig";

const LocalStrategy = passportLocal.Strategy;

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email: string, password: string, done) => {
    // get user by email
    const user = await Users.findOne({
      email,
    });
    if (user === null) {
      return done(null, false, {
        message: "Credenciales incorrectas",
      });
    }
    // match password validation
    const matchPasswords = await matchPassword(user.password, password);
    if (!matchPasswords) {
      return done(null, false, { message: "Credenciales incorrectas" });
    }
    const { password: noPassword, ...clientUser } = user;
    return done(null, clientUser);
  },
);

const jwtOptions: StrategyOptions = {
  jwtFromRequest: (req) => {
    // Read token from header or cookies
    let token = null;
    if (req.headers.authorization) {
      token = req.headers.authorization;
    }
    if (req.cookies[cookiesConfig.access.name]) {
      token = req.cookies[cookiesConfig.access.name];
    }
    return token;
  },
  secretOrKey: process.env.JWT_ACCESS_SECRET!,
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await Users.findOne(
      {
        _id: new ObjectId(payload._id),
      },
      {
        projection: { password: 0 },
      },
    );

    if (user === null) {
      return done(null, false, { message: "Invalid token" });
    }

    return done(null, user);
  } catch (error) {
    done(error, false, { message: "Usuario no encontrado" });
  }
});

passport.use(jwtLogin);
passport.use(localLogin);
