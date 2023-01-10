import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: [process.env.FRONTEND_URL ?? "http://localhost:3000"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  return res.json({ message: "API working" });
});

export default app;
