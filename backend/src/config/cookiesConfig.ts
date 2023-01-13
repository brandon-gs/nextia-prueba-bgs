import { CookieOptions } from "express";

interface ICookieConfig {
  name: string;
  options: CookieOptions;
  delete: CookieOptions;
}

const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

const access: ICookieConfig = {
  name: "access_token",
  options: {
    domain:
      process.env.NODE_ENV === "production" ? ".brandongs.xyz" : ".localhost",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    path: "/",
    expires,
  },
  delete: {
    domain:
      process.env.NODE_ENV === "production" ? ".brandongs.xyz" : ".localhost",
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
};

export default {
  access,
};
