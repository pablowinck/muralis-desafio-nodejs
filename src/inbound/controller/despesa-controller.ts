import { IRouter } from "express";
import { BuscaDespesasMesAtual } from "../../core/use-case/busca-despesas-mes-atual";
import { Pageable } from "../../core/domain/entity/Pageable";
import { CadastraDespesa } from "../../core/use-case/cadastra-despesa";
import { BuscaDespesasPorPeriodo } from "../../core/use-case/busca-despesas-por-periodo";
import { HttpException } from "../../core/domain/entity/HttpException";

export class DespesaController {
  constructor(
    readonly router: IRouter,
    readonly buscaDespesasMesAtual: BuscaDespesasMesAtual,
    readonly buscaDespesasPorPeriodo: BuscaDespesasPorPeriodo,
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
    router.post("/api/despesas", async (req, res) => {
      const despesa = await cadastraDespesa.execute(req.body);
      res.send(despesa);
    });
  }
}
