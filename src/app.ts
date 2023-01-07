import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import logger from "./core/config/logger";
import { PostgreSQLConnector } from "./core/connectors/PostgreSQLConnector";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

new PostgreSQLConnector({
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  port: parseInt(process.env.DB_PORT || "5432"),
}).connect();

app.get("/", (req: Request, res: Response) => {
  res.send(JSON.stringify({ message: "Hello World!" }));
});

app.listen(port, () => {
  logger.info(`[server]: Server is running at port ${port}`);
});
