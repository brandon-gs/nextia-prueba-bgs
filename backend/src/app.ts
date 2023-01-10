import "./services/passport";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import * as middlewares from "./middlewares";

const app = express();

app.set("trust proxy", 1);
app.enable("trust proxy");

app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL ?? "http://localhost:3000"],
    credentials: true,
  }),
);
app.use(express.json());

app.use(middlewares.speedLimiter);
app.get("/", (req, res) => {
  return res.json({ message: "API working" });
});

// This middlewares should be at the end
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
