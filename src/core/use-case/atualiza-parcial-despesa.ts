import { DespesaRepository } from "@repository/despesa-repository";
import { BuscaCategoriaEspecifica } from "@usecase/busca-categoria-especifica";
import { BuscaTipoPagamentoEspecifico } from "@usecase/busca-tipo-pagamento-especifico";
import { ResponseDto } from "@dto/response-dto";
import { HttpException } from "@entity/HttpException";
import logger from "@core/config/logger";

export class AtualizaParcialDespesa {
  constructor(
    private readonly despesaRepository: DespesaRepository,
    private readonly buscaCategoriaEspecifica: BuscaCategoriaEspecifica,
    private readonly buscaTipoPagamentoEspecifico: BuscaTipoPagamentoEspecifico
  ) {}

  async execute(id: number, dto: any): Promise<ResponseDto> {
    logger.info("[use-case] Atualizando parcialmente despesa: %o", dto);
    const exist = await this.despesaRepository.existsById(id);
    if (!exist) throw new HttpException(404, "Despesa não encontrada");
    if (dto.categoriaId) {
      await this.buscaCategoriaEspecifica.execute(dto.categoriaId);
    }
    if (dto.tipoPagamentoId) {
      await this.buscaTipoPagamentoEspecifico.execute(dto.tipoPagamentoId);
    }
    await this.despesaRepository.update(id, dto);
    return new ResponseDto(`Despesa ${id} atualizada`, true);
  }
}
