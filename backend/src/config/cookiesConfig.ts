import { CookieOptions } from "express";

interface ICookieConfig {
  name: string;
  options: CookieOptions;
}

const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

const access: ICookieConfig = {
  name: "access_token",
  options: {
    domain:
      process.env.NODE_ENV === "production" ? ".brandongs.xyz" : ".localhost",
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
    path: "/",
    expires,
  },
};

export default {
  access,
};
