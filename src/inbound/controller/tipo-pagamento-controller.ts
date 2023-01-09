import { BuscaTodosTiposPagamento } from "@usecase/busca-todos-tipos-pagamento";
import { IRouter } from "express";

export class TipoPagamentoController {
  constructor(
    readonly router: IRouter,
    readonly buscaTodosTiposPagamento: BuscaTodosTiposPagamento
  ) {
    this.router.get("/api/tipos-pagamento", async (req, res) => {
      const tiposPagamento = await buscaTodosTiposPagamento.execute();
      res.json(tiposPagamento);
    });
  }
}
