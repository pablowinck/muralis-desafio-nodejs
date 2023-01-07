import { DespesaDto } from "../domain/dto/despesa-dto";
import { DespesaRepository } from "../repository/despesa-repository";
import logger from "../config/logger";
import { Page } from "../domain/entity/Page";

export class BuscaDespesasMesAtual {
  constructor(private readonly despesaRepository: DespesaRepository) {}

  async execute(): Promise<Page<DespesaDto>> {
    logger.info("Buscando despesas do mês atual");
    const despesas = await this.despesaRepository.findDespesaByMesAtual();
    logger.info("Despesas do mês atual buscadas com sucesso: %o", despesas);
    return despesas;
  }
}
