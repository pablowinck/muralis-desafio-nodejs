import { DespesaRepository } from "@repository/despesa-repository";
import { HttpException } from "@entity/HttpException";
import logger from "@core/config/logger";

export class ExcluiDespesa {
  constructor(private readonly despesaRepository: DespesaRepository) {}

  async execute(id: number): Promise<void> {
    logger.info("[use-case] Excluindo despesa: %o", id);
    const exist = await this.despesaRepository.existsById(id);
    if (!exist) throw new HttpException(404, "Despesa não encontrada");
    await this.despesaRepository.deleteById(id);
    logger.info("[use-case] Despesa excluída: %o", id);
  }
}
