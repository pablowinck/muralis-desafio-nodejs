import { Express } from "express";
import { BuscaDespesasMesAtual } from "../../core/use-case/busca-despesas-mes-atual";
import { Pageable } from "../../core/domain/entity/Pageable";

export class DespesaController {
  constructor(
    readonly server: Express,
    readonly buscaDespesasMesAtual: BuscaDespesasMesAtual
  ) {
    server.get("/despesas", async (req, res) => {
      const page = req.query.page ? parseInt(req.query.page as string) : 0;
      const size = req.query.size ? parseInt(req.query.size as string) : 10;

      const despesas = await buscaDespesasMesAtual.execute(
        new Pageable(page, size)
      );
      res.send(despesas);
    });
  }
}
