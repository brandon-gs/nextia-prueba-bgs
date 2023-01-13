import { Router } from "express";
import * as authController from "./auth.controller";
import { requireAuth, requireLogin } from "../../middlewares/passport";

const router = Router();

router.post("/register", authController.register);
router.post("/login", requireLogin, authController.login);
router.post("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.post("/recover-password", authController.recoverPassword);
router.get("/user", requireAuth, authController.getUser);

export default router;
