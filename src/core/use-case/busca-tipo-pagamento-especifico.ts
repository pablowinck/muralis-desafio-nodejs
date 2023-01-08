import { HttpException } from "@entity/HttpException";
import logger from "@core/config/logger";
import { TipoPagamentoRepository } from "@repository/tipo-pagamento-repository";
import { TipoPagamento } from "@entity/TipoPagamento";

export class BuscaTipoPagamentoEspecifico {
  constructor(
    private readonly tipoPagamentoRepository: TipoPagamentoRepository
  ) {}

  async execute(id: number): Promise<TipoPagamento | undefined> {
    logger.info("[use-case] Buscando tipo de pagamento com id %d", id);
    const tipoPagamento = await this.tipoPagamentoRepository.findById(id);
    if (!tipoPagamento)
      throw new HttpException(404, "Categoria não encontrada");
    logger.info("[use-case] Tipo de pagamento encontrada: %o", tipoPagamento);
    return tipoPagamento;
  }
}
