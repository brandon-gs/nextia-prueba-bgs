import nodemailer from "nodemailer";

export const nodemailerClient = nodemailer.createTransport({
  service: process.env.SMTP_PROVIDER,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});
