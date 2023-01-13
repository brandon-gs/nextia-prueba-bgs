import { ObjectId } from "mongodb";
import { createAccessToken } from "../../../api/auth";
import { nodemailerClient } from "../nodemailerClient";

const domain =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : process.env.FRONTEND_URL;

const sendResetPasswordEmail = async (
  userId: ObjectId,
  name: string,
  email: string,
) => {
  const token = createAccessToken(userId, email, "10m");
  const link = `${domain}/reset-password/${token}`;
  await nodemailerClient.sendMail({
    from: `"Brandon - Nextia" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: " Nextia - Activar Cuenta",
    html: `<div><h4>Hola ${name}👋,</h4></div>
        <div>
        <p>Para continuar con tu reinicio de contraseña te pedimos hagas click en el link de abajo:</p>
        <p>Este link caducará en 10 minutos</p>
        </div>
        <div><a href='${link}' alt="activation link">${link}</a></div>`,
  });
};

export default sendResetPasswordEmail;
