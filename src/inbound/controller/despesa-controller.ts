import { IRouter } from "express";
import { BuscaDespesasMesAtual } from "@usecase/busca-despesas-mes-atual";
import { Pageable } from "@entity/Pageable";
import { CadastraDespesa } from "@usecase/cadastra-despesa";
import { BuscaDespesasPorPeriodo } from "@usecase/busca-despesas-por-periodo";
import { HttpException } from "@entity/HttpException";
import { ValidationMiddleware } from "../middleware/validation-middleware";
import { CadastraDespesaDto } from "@dto/cadastra-despesa-dto";
import { BuscaDespesaEspecifica } from "@usecase/busca-despesa-especifica";

export class DespesaController {
  constructor(
    readonly router: IRouter,
    readonly buscaDespesasMesAtual: BuscaDespesasMesAtual,
    readonly buscaDespesasPorPeriodo: BuscaDespesasPorPeriodo,
    readonly buscaDespesaEspecifica: BuscaDespesaEspecifica,
    readonly cadastraDespesa: CadastraDespesa
  ) {
    router.get("/api/despesas", async (req, res) => {
      const page = req.query.page ? parseInt(req.query.page as string) : 0;
      const size = req.query.size ? parseInt(req.query.size as string) : 10;
      const dataInicio = req.query.dataInicio
        ? (req.query.dataInicio as string)
        : null;
      const dataFim = req.query.dataFim ? (req.query.dataFim as string) : null;
      if (dataInicio && dataFim) {
        if (dataInicio > dataFim) {
          throw new HttpException(
            500,
            "Data inicial não pode ser maior que data final"
          );
        }
        const despesas = await buscaDespesasPorPeriodo.execute({
          page,
          size,
          dataInicio,
          dataFim,
        });
        res.json(despesas);
        return;
      }
      const despesas = await buscaDespesasMesAtual.execute(
        new Pageable(page, size)
      );
      res.json(despesas);
    });
    router.get("/api/despesas/:id", async (req, res) => {
      const id = parseInt(req.params.id);
      const despesa = await buscaDespesaEspecifica.execute(id);
      res.json(despesa);
    });
    router.post(
      "/api/despesas",
      ValidationMiddleware(CadastraDespesaDto),
      async (req, res) => {
        const despesa = await cadastraDespesa.execute(req.body);
        res.send(despesa);
      }
    );
  }
}
