import PDFDocument from "pdfkit-table";
import { DetalheRelatorioDto } from "@dto/detalhe-relatorio-dto";
import * as fs from "fs";
import { ResponseDto } from "@dto/response-dto";
import { UploadFile } from "@outbound/s3/upload-file";
import logger from "@core/config/logger";
import { BuscaDespesasPorPeriodo } from "@usecase/busca-despesas-por-periodo";
import { DateMapper } from "@mapper/date-mapper";

export class RelatorioPdf {
  constructor(
    private readonly buscaDespesasPorPeriodo: BuscaDespesasPorPeriodo,
    private readonly uploadFile: UploadFile
  ) {}

  async execute(dataInicio: string, dataFim: string): Promise<ResponseDto> {
    const despesasPage = await this.buscaDespesasPorPeriodo.execute({
      dataInicio,
      dataFim,
      page: 0,
      size: 1000000,
    });
    if (despesasPage.content.length === 0) {
      return new ResponseDto("Nenhuma despesa encontrada", false);
    }
    const despesas = despesasPage.content.map((despesa) =>
      DetalheRelatorioDto.from(despesa)
    );
    const nomeArquivo = `relatorio-${new Date().getTime()}.pdf`;
    const tmpPath = `./reports/${nomeArquivo}`;
    if (!fs.existsSync("./reports")) {
      fs.mkdirSync("./reports");
    }
    const doc = new PDFDocument({ margin: 25, size: "A4" });
    const stream = doc.pipe(fs.createWriteStream(tmpPath));

    const table = {
      title: `Relatório de despesas - de ${DateMapper.from(
        dataInicio
      ).toLocaleDateString("pt-BR")} a ${DateMapper.from(
        dataFim
      ).toLocaleDateString("pt-BR")}`,
      headers: Object.keys(despesas[0]).map((key) => ({
        label: key[0].toUpperCase() + key.substring(1),
        align: "left",
      })),
      rows: despesas.map((despesa) => Object.values(despesa)),
    };
    await doc.table(table, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
    });

    doc.end();
    await new Promise((resolve) => stream.on("finish", resolve));

    const buffer = fs.readFileSync(tmpPath);
    await fs.unlink(tmpPath, (err) => {
      if (err) {
        logger.info(`Erro deletando arquivo temporario: ${err}`);
        return;
      }
    });

    return await this.uploadFile.execute(
      buffer,
      nomeArquivo,
      "application/pdf"
    );
  }
}
