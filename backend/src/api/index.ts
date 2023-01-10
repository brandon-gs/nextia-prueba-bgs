import { Router } from "express";

import auth from "./auth/auth.routes";

const router = Router();

router.get("/", (req, res) => {
  return res.json({ message: "API working" });
});
router.use("/auth", auth);

export default router;
