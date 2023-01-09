import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import logger from "./core/config/logger";
import { PgConnection } from "@connections/pg-connection";
import dotenv from "dotenv";
import { DespesaRepositoryImpl } from "@outbound/database/despesa-repository-impl";
import { BuscaDespesasMesAtual } from "@usecase/busca-despesas-mes-atual";
import { DespesaController } from "@inbound/controller/despesa-controller";
import { CategoriaRepositoryImpl } from "@outbound/database/categoria-repository-impl";
import { TipoPagamentoRepositoryImpl } from "@outbound/database/tipo-pagamento-repository-impl";
import { ViaCepRepositoryImpl } from "@outbound/rest/via-cep-repository-impl";
import { CadastraDespesa } from "@usecase/cadastra-despesa";
import { BuscaDespesasPorPeriodo } from "@usecase/busca-despesas-por-periodo";
import { errorMiddleware } from "@inbound/middleware/error-middleware";
import "express-async-errors";
import { BuscaDespesaEspecifica } from "@usecase/busca-despesa-especifica";
import { BuscaCategoriaEspecifica } from "@usecase/busca-categoria-especifica";
import { BuscaTipoPagamentoEspecifico } from "@usecase/busca-tipo-pagamento-especifico";
import { AtualizaTodaDespesa } from "@usecase/atualiza-toda-despesa";
import { AtualizaParcialDespesa } from "@usecase/atualiza-parcial-despesa";
import { ExcluiDespesa } from "@usecase/exclui-despesa";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

const router = express.Router();

const client = new PgConnection();
const despesaRepository = new DespesaRepositoryImpl(client);
const categoriaRepository = new CategoriaRepositoryImpl(client);
const tipoPagamentoRepository = new TipoPagamentoRepositoryImpl(client);
const viacepRepository = new ViaCepRepositoryImpl();
const buscaDespesasMesAtual = new BuscaDespesasMesAtual(despesaRepository);
const buscaDespesasPorPeriodo = new BuscaDespesasPorPeriodo(despesaRepository);
const buscaDespesaEspecifica = new BuscaDespesaEspecifica(despesaRepository);
const buscaCategoriaEspecifica = new BuscaCategoriaEspecifica(
  categoriaRepository
);
const buscaTipoPagamentoEspecifico = new BuscaTipoPagamentoEspecifico(
  tipoPagamentoRepository
);
const cadastraDespesa = new CadastraDespesa(
  despesaRepository,
  buscaCategoriaEspecifica,
  buscaTipoPagamentoEspecifico,
  viacepRepository
);
const atualizaTodaDespesa = new AtualizaTodaDespesa(
  despesaRepository,
  buscaCategoriaEspecifica,
  buscaTipoPagamentoEspecifico
);
const atualizaParcialDespesa = new AtualizaParcialDespesa(
  despesaRepository,
  buscaCategoriaEspecifica,
  buscaTipoPagamentoEspecifico
);
const excluiDespesa = new ExcluiDespesa(despesaRepository);
new DespesaController(
  router,
  buscaDespesasMesAtual,
  buscaDespesasPorPeriodo,
  buscaDespesaEspecifica,
  cadastraDespesa,
  atualizaTodaDespesa,
  atualizaParcialDespesa,
  excluiDespesa
);

app.get("/", (req: Request, res: Response) => {
  res.send(JSON.stringify({ message: "server is up!" }));
});
app.use(errorMiddleware);
router.use(errorMiddleware);
app.use(router);
app.listen(port, () => {
  logger.info(`[server]: Server is running at port ${port}`);
});
