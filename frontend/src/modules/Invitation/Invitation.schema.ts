import * as z from "zod";

export const CreateInvitation = z.object({
  guestName: z
    .string({ required_error: "El nombre es requerido" })
    .min(3, "El nombre debe tener al menos 3 carácteres"),
  endDate: z.date({
    required_error: "La fecha es requerida",
  }),
  startDate: z.date({
    required_error: "La fecha es requerida",
  }),
});

export type CreateInvitation = z.infer<typeof CreateInvitation>;
export type Invitation = CreateInvitation & { _id: string; ownerId: string };
