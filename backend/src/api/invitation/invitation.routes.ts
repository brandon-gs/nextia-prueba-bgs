import { Router } from "express";
import * as invitationController from "./invitation.controller";
import { requireAuth } from "../../middlewares/passport";

const router = Router();

router.post("/", requireAuth, invitationController.createInvitation);

export default router;
