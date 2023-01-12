import { WithId } from "mongodb";
import * as z from "zod";
import { db } from "../../db";

export const Invitation = z.object({
  ownerId: z.string(),
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

export type Invitation = z.infer<typeof Invitation>;
export type InvitationWithId = WithId<Invitation>;
export const Invitations = db.collection<Invitation>("invitations");
