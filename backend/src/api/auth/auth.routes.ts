import { Router } from "express";
import * as authController from "./auth.controller";
import { requireLogin } from "../../middlewares/passport";

const router = Router();

router.post("/register", authController.register);
router.post("/login", requireLogin, authController.login);
router.post("/logout", authController.logout);

export default router;
