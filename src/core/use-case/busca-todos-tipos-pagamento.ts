import { TipoPagamentoRepository } from "@repository/tipo-pagamento-repository";
import logger from "@core/config/logger";

export class BuscaTodosTiposPagamento {
  constructor(private readonly repository: TipoPagamentoRepository) {}

  async execute() {
    logger.info("Buscando todos os tipos de pagamento");
    const tiposPagamento = await this.repository.findAll();
    logger.info(`${tiposPagamento.length} tipos de pagamento encontrados`);
    return tiposPagamento;
  }
}
