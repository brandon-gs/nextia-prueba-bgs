import { WithId } from "mongodb";
import * as z from "zod";
import { db } from "../../db";

export const User = z.object({
  firstname: z.string({ required_error: "El nombre es requerido" }).min(3),
  lastname: z.string({ required_error: "Los apellidos son requridos" }).min(3),
  email: z
    .string({ required_error: "El correo electrónico es requerido" })
    .min(1, "El correo electrónico es requerido")
    .email("Correo electrónico inválido."),
  password: z
    .string({ required_error: "La contraseña es requerida" })
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 carácteres")
    .max(32, "La contraseña debe tener máximo 32 carácteres"),
  department: z
    .number({ required_error: "El número de departamento es requerido" })
    .min(1, "El número de departamento es requerido"),
});

export type User = z.infer<typeof User>;
export type UserClientSession = Omit<User, "password">;
export type UserWithId = WithId<User>;
export const Users = db.collection<User>("users");
