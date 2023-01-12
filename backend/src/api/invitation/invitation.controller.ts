import type { NextFunction, Request, Response } from "express";
import { Invitation, InvitationWithId, Invitations } from "./invitation.schema";
import { UserClientSession } from "../user/user.model";

export async function createInvitation(
  req: Request<{}, InvitationWithId, Invitation>,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = req.user as UserClientSession;
    const { startDate, endDate, guestName } = req.body;
    const validInvitation = Invitation.parse({
      startDate,
      endDate,
      guestName,
      ownerId: user._id.toString(),
    });

    const invitationCreated = await Invitations.insertOne(validInvitation);

    res.status(200).json({
      message: "Invitación creada",
      invitation: { ...validInvitation, _id: invitationCreated.insertedId },
    });
  } catch (error) {
    next(error);
  }
}
