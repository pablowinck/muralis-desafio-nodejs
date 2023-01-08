import { IRouter, Request, Response } from "express";
import { BuscaDespesasMesAtual } from "@usecase/busca-despesas-mes-atual";
import { Pageable } from "@entity/Pageable";
import { CadastraDespesa } from "@usecase/cadastra-despesa";
import { BuscaDespesasPorPeriodo } from "@usecase/busca-despesas-por-periodo";
import { ValidationMiddleware } from "../middleware/validation-middleware";
import { PersistDespesaDto } from "@dto/persist-despesa-dto";
import { BuscaDespesaEspecifica } from "@usecase/busca-despesa-especifica";
import { AtualizaTodaDespesa } from "@usecase/atualiza-toda-despesa";
import { UpdateDespesaDto } from "@dto/update-despesa-dto";

export class DespesaController {
  constructor(
    readonly router: IRouter,
    readonly buscaDespesasMesAtual: BuscaDespesasMesAtual,
    readonly buscaDespesasPorPeriodo: BuscaDespesasPorPeriodo,
    readonly buscaDespesaEspecifica: BuscaDespesaEspecifica,
    readonly cadastraDespesa: CadastraDespesa,
    readonly atualizaTodaDespesa: AtualizaTodaDespesa
  ) {
    router.get("/api/despesas", async (req, res) => {
      await this.buscaDespesas(req, res);
    });
    router.get("/api/despesas/:id", async (req, res) => {
      const id = parseInt(req.params.id);
      const despesa = await buscaDespesaEspecifica.execute(id);
      res.json(despesa);
    });
    router.post(
      "/api/despesas",
      ValidationMiddleware(PersistDespesaDto),
      async (req, res) => {
        const despesa = await cadastraDespesa.execute(req.body);
        res.send(despesa);
      }
    );
    router.put(
      "/api/despesas/:id",
      ValidationMiddleware(UpdateDespesaDto),
      async (req, res) => {
        const id = parseInt(req.params.id);
        const despesa = await atualizaTodaDespesa.execute(id, req.body);
        res.send(despesa);
      }
    );
  }

  async buscaDespesas(req: Request, res: Response) {
    const page = req.query.page ? parseInt(req.query.page as string) : 0;
    const size = req.query.size ? parseInt(req.query.size as string) : 10;
    const dataInicio = req.query.dataInicio
      ? (req.query.dataInicio as string)
      : null;
    const dataFim = req.query.dataFim ? (req.query.dataFim as string) : null;
    if (dataInicio && dataFim) {
      const despesas = await this.buscaDespesasPorPeriodo.execute({
        page,
        size,
        dataInicio,
        dataFim,
      });
      res.json(despesas);
      return;
    }
    const despesas = await this.buscaDespesasMesAtual.execute(
      new Pageable(page, size)
    );
    res.json(despesas);
  }
}
