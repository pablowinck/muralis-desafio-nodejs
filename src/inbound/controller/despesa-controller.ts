import { Express } from "express";
import { BuscaDespesasMesAtual } from "../../core/use-case/busca-despesas-mes-atual";

export class DespesaController {
  constructor(
    readonly server: Express,
    readonly buscaDespesasMesAtual: BuscaDespesasMesAtual
  ) {
    server.get("/despesas", async (req, res) => {
      const despesas = await buscaDespesasMesAtual.execute();
      res.send(despesas);
    });
  }
}
