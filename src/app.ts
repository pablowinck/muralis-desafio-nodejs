import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import logger from "./core/config/logger";
import { PgConnection } from "./core/connections/pg-connection";
import dotenv from "dotenv";
import { DespesaRepositoryImpl } from "./outbound/database/despesa-repository-impl";
import { BuscaDespesasMesAtual } from "./core/use-case/busca-despesas-mes-atual";
import { DespesaController } from "./inbound/controller/despesa-controller";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

const client = new PgConnection();
const despesaRepository = new DespesaRepositoryImpl(client);
const buscaDespesasMesAtual = new BuscaDespesasMesAtual(despesaRepository);

new DespesaController(app, buscaDespesasMesAtual);

app.get("/", (req: Request, res: Response) => {
  res.send(JSON.stringify({ message: "server is up!" }));
});

app.listen(port, () => {
  logger.info(`[server]: Server is running at port ${port}`);
});
