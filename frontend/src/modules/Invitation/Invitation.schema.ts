import * as z from "zod";

export const CreateInvitation = z.object({
  guestName: z
    .string({ required_error: "El nombre es requerido" })
    .min(3, "El nombre debe tener al menos 3 carácteres"),
  startDate: z
    .string({
      required_error: "La fecha de inicio es requerida",
      invalid_type_error: "La fecha de inicio es requerida",
    })
    .datetime({ message: "Formato de fecha inválido" }),
  endDate: z
    .string({
      required_error: "La fecha de finalización es requerida",
      invalid_type_error: "La fecha de finalización es requerida",
    })
    .datetime({ message: "Formato de fecha inválido" }),
});

export type CreateInvitation = z.infer<typeof CreateInvitation>;
export type Invitation = CreateInvitation & { _id: string; ownerId: string };
