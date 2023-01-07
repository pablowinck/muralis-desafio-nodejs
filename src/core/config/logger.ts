import pino from "pino";

export default pino({
    enabled: process.env.LOG_ENABLED === "true",
    level: process.env.LOG_LEVEL || "debug",
});