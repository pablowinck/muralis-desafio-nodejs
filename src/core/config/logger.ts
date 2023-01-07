import pino from "pino";
import dotenv from "dotenv";

dotenv.config();

export default pino({
  enabled: process.env.LOG_ENABLED === "true",
  level: process.env.LOG_LEVEL || "debug",
});
