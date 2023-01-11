import * as z from "zod";
import { TypeOf } from "zod";
const passwordSchema = z
  .string({ required_error: "La contraseña es requerida" })
  .min(1, "La contraseña es requerida")
  .min(8, "La contraseña debe tener al menos 8 carácteres")
  .max(32, "La contraseña debe tener máximo 32 carácteres");

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "Las contraseñas no coinciden",
      });
    }
  });
export type IResetPasswordSchema = TypeOf<typeof resetPasswordSchema>;
