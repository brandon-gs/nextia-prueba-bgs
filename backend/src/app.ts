import "./services/passport";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import * as middlewares from "./middlewares";
import api from "./api/";

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

app.use("/api/v1", api);

// This middlewares should be at the end
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
