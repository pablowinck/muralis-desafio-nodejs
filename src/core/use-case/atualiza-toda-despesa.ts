import { DespesaRepository } from "@repository/despesa-repository";
import { HttpException } from "@entity/HttpException";
import { UpdateDespesaDto } from "@dto/update-despesa-dto";
import { ResponseDto } from "@dto/response-dto";
import logger from "@core/config/logger";
import { BuscaCategoriaEspecifica } from "@usecase/busca-categoria-especifica";
import { BuscaTipoPagamentoEspecifico } from "@usecase/busca-tipo-pagamento-especifico";

export class AtualizaTodaDespesa {
  constructor(
    private readonly despesaRepository: DespesaRepository,
    private readonly buscaCategoriaEspecficica: BuscaCategoriaEspecifica,
    private readonly buscaTipoPagamentoEspecifico: BuscaTipoPagamentoEspecifico
  ) {}

  async execute(id: number, dto: UpdateDespesaDto): Promise<ResponseDto> {
    logger.info("[use-case] Atualizando despesa: %o", dto);
    const exist = await this.despesaRepository.existsById(id);
    if (!exist) throw new HttpException(404, "Despesa não encontrada");
    await this.buscaCategoriaEspecficica.execute(dto.categoriaId);
    await this.buscaTipoPagamentoEspecifico.execute(dto.tipoPagamentoId);
    const result = await this.despesaRepository.save(dto.toEntity(id));
    if (!result) {
      throw new HttpException(500, "Erro ao atualizar despesa");
    }
    logger.info("[use-case] Despesa atualizada com sucesso com id %d", id);
    return new ResponseDto(`Despesa ${id} atualizada`, true);
  }
}
