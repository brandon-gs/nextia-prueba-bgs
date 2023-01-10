import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.json({ message: "API working" });
});

export default app;
