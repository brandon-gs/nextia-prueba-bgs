import { Router } from "express";
import * as invitationController from "./invitation.controller";
import { requireAuth } from "../../middlewares/passport";

const router = Router();

router
  .route("/")
  .post(requireAuth, invitationController.createInvitation)
  .get(requireAuth, invitationController.getUserInvitations);

router.route("/:id").get(requireAuth, invitationController.getInvitation);

export default router;
