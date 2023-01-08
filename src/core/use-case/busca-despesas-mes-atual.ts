import { DespesaDto } from "../domain/dto/despesa-dto";
import { DespesaRepository } from "../repository/despesa-repository";
import logger from "../config/logger";
import { Page } from "../domain/entity/Page";

export class BuscaDespesasMesAtual {
  constructor(private readonly despesaRepository: DespesaRepository) {}

  async execute(): Promise<Page<DespesaDto>> {
    logger.info("[use-case] Buscando despesas do mes atual");
    const despesas = await this.despesaRepository.findDespesaByMesAtual();
    logger.info("[use-case] Despesas do mes atual buscadas com sucesso");
    return despesas;
  }
}
