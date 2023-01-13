import slowDown from "express-slow-down";

export const speedLimiter = slowDown({
  windowMs: 10 * 60 * 1000, // 10 minutes
  delayAfter: 100, // allow 100 requests per 15 minutes, then...
  delayMs: 500, // begin adding 500ms of delay per request above 100:
});
