import { Router } from "express";

import auth from "./auth/auth.routes";
import invitation from "./invitation/invitation.routes";

const router = Router();

router.get("/", (req, res) => {
  return res.json({ message: "API working" });
});
router.use("/auth", auth);
router.use("/invitation", invitation);

export default router;
