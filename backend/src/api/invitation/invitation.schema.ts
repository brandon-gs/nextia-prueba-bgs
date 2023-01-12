import { WithId } from "mongodb";
import * as z from "zod";
import { db } from "../../db";

export const Invitation = z.object({
  ownerId: z.string(),
  guestName: z.string({ required_error: "El nombre es requerido" }).min(3),
  startDate: z.date({ required_error: "La fecha de entrada es requerida" }),
  endDate: z.date({ required_error: "La fecha de finalización es requerida" }),
});

export type Invitation = z.infer<typeof Invitation>;
export type InvitationWithId = WithId<Invitation>;
export const Invitations = db.collection<Invitation>("invitations");
