import { DespesaRepository } from "../repository/despesa-repository";
import { Page } from "../domain/entity/Page";
import { DetalheDespesaDto } from "../domain/dto/detalhe-despesa-dto";
import logger from "../config/logger";

export class BuscaDespesasPorPeriodo {
  constructor(private readonly repository: DespesaRepository) {}

  async execute(options: {
    size: number;
    dataFim: string;
    page: number;
    dataInicio: string;
  }): Promise<Page<DetalheDespesaDto>> {
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
