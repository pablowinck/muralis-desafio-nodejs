import { DespesaRepository } from "@repository/despesa-repository";
import { Page } from "@entity/Page";
import { DetalheDespesaDto } from "@dto/detalhe-despesa-dto";
import logger from "../config/logger";
import { HttpException } from "@entity/HttpException";

export class BuscaDespesasPorPeriodo {
  constructor(private readonly repository: DespesaRepository) {}

  async execute(options: {
    size: number;
    dataFim: string;
    page: number;
    dataInicio: string;
  }): Promise<Page<DetalheDespesaDto>> {
    if (options.dataInicio > options.dataFim) {
      throw new HttpException(
        500,
        "Data inicial não pode ser maior que data final"
      );
    }
    logger.info(
      `[use-case] Buscando despesas entre datas: dataInicial ${options.dataInicio} e dataFinal ${options.dataFim}`
    );
    const despesas = await this.repository.findByPeriodo(options);
    logger.info(
      `[use-case] ${despesas.totalElements} despesas entre ${options.dataInicio} e ${options.dataFim} atual buscadas com sucesso`
    );
    return despesas;
  }
}
