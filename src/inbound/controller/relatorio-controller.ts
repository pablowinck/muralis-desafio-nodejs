import { IRouter } from "express";
import { RelatorioCsv } from "@usecase/relatorio-csv";
import { RelatorioPdf } from "@usecase/relatorio-pdf";

export class RelatorioController {
  constructor(
    readonly router: IRouter,
    readonly relatorioCsv: RelatorioCsv,
    readonly relatorioPdf: RelatorioPdf
  ) {
    router.get("/api/relatorio/csv", async (req, res) => {
      const response = await this.relatorioCsv.execute();
      res.send(response);
    });
    router.get("/api/relatorio/pdf", async (req, res) => {
      const dataInicio = req.query.dataInicio
        ? (req.query.dataInicio as string)
        : startOfMonth(new Date()).toISOString().split("T")[0];
      const dataFim = req.query.dataFim
        ? (req.query.dataFim as string)
        : new Date().toISOString().split("T")[0];

      const response = await this.relatorioPdf.execute(dataInicio, dataFim);
      res.send(response);
    });
  }
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
