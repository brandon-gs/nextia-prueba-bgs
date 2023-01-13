import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT || "5000";

console.log("ENV:", process.env.NODE_ENV);

app.listen(PORT, () => {
  console.log(`Listening: http://localhost:${PORT}`);
});
