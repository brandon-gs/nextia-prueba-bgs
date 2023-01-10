import { object, string, TypeOf } from "zod";

export const loginSchema = object({
  email: string(),
  password: string(),
});

export type ILoginSchema = TypeOf<typeof loginSchema>;
