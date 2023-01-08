import { DetalheDespesaDto } from "@dto/detalhe-despesa-dto";
import { DespesaRepository } from "@repository/despesa-repository";
import logger from "../config/logger";
import { Page } from "@entity/Page";
import { Pageable } from "@entity/Pageable";

export class BuscaDespesasMesAtual {
  constructor(private readonly despesaRepository: DespesaRepository) {}

  async execute(options: Pageable): Promise<Page<DetalheDespesaDto>> {
    logger.info("[use-case] Buscando despesas do mes atual");
    const despesas = await this.despesaRepository.findByMesAtual(options);
    logger.info("[use-case] Despesas do mes atual buscadas com sucesso");
    return despesas;
  }
}
