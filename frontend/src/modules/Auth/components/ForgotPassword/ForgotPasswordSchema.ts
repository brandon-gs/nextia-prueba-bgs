import * as z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string(),
});

export type IForgotPasswordSchema = z.TypeOf<typeof forgotPasswordSchema>;
