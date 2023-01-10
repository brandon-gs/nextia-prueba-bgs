import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import * as middlewares from "./middlewares";

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL ?? "http://localhost:3000"],
    credentials: true,
  }),
);

app.use(middlewares.speedLimiter);
app.get("/", (req, res) => {
  return res.json({ message: "API working" });
});

export default app;
