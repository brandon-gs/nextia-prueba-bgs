import * as z from "zod";

export const PasswordSchema = z.object({
  password: z
    .string({ required_error: "La contraseña es requerida" })
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 carácteres")
    .max(32, "La contraseña debe tener máximo 32 carácteres"),
});

export type PasswordSchema = z.infer<typeof PasswordSchema>;

export const EmailSchema = z.object({
  email: z
    .string({ required_error: "El correo electrónico es requerido" })
    .min(1, "El correo electrónico es requerido")
    .email("Correo electrónico inválido."),
});

export type EmailSchema = z.infer<typeof EmailSchema>;
