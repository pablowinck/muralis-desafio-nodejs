import { BuscaDespesasMesAtual } from "@usecase/busca-despesas-mes-atual";
import { Pageable } from "@entity/Pageable";
import json2csv from "json2csv";
import { ResponseDto } from "@dto/response-dto";
import { DetalheCsvDto } from "@dto/detalhe-csv-dto";
import { UploadFile } from "@outbound/s3/upload-file";

export class RelatorioCsv {
  constructor(
    private readonly buscaDespesasMesAtual: BuscaDespesasMesAtual,
    private readonly uploadFile: UploadFile
  ) {}

  async execute(): Promise<ResponseDto> {
    const despesasPage = await this.buscaDespesasMesAtual.execute(
      new Pageable(0, 1000000)
    );
    const despesas = despesasPage.content.map((despesa) =>
      DetalheCsvDto.from(despesa)
    );
    const csv = await json2csv
      .parseAsync(despesas, {
        fields: Object.keys(despesas[0]),
        delimiter: ";",
      })
      .then((csv) => Buffer.from(csv, "utf-8"));

    const nomeArquivo = `relatorio-${new Date().getTime()}.csv`;

    return await this.uploadFile.execute(csv, nomeArquivo, "text/csv");
  }
}
