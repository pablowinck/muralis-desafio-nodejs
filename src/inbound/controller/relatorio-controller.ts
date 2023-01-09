import { IRouter } from "express";
import { RelatorioCsv } from "@usecase/relatorio-csv";

export class RelatorioController {
  constructor(readonly router: IRouter, readonly relatorioCsv: RelatorioCsv) {
    router.get("/api/relatorio/csv", async (req, res) => {
      const response = await this.relatorioCsv.execute();
      res.send(response);
    });
  }
}
