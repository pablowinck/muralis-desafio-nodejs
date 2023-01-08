import { DespesaRepository } from "@repository/despesa-repository";
import { DetalheDespesaDto } from "@dto/detalhe-despesa-dto";
import logger from "../config/logger";
import { HttpException } from "@entity/HttpException";

export class BuscaDespesaEspecifica {
  constructor(private readonly despesaRepository: DespesaRepository) {}

  async execute(id: number): Promise<DetalheDespesaDto> {
    logger.info("[use-case] Buscando despesa especifica");
    const despesa = await this.despesaRepository.findById(id);
    if (!despesa) {
      throw new HttpException(404, "Despesa não encontrada");
    }
    logger.info("[use-case] Despesa especifica buscada com sucesso");
    return despesa;
  }
}
