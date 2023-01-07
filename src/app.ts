import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import logger from "./core/config/logger";
import { PostgreSQLConnector } from "./core/connectors/PostgreSQLConnector";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

const client = new PostgreSQLConnector({
  connectionString: process.env.DATABASE_URL || "",
}).getClient();

app.get("/", (req: Request, res: Response) => {
  res.send(JSON.stringify({ message: "Hello World!" }));
});

app.listen(port, () => {
  logger.info(`[server]: Server is running at port ${port}`);
});
