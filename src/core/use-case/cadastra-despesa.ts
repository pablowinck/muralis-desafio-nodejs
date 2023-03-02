import { DespesaRepository } from "@repository/despesa-repository";
import { PersistDespesaDto } from "@dto/persist-despesa-dto";
import { ResponseDto } from "@dto/response-dto";
import { ViaCepRepository } from "@repository/via-cep-repository";
import { Despesa } from "@entity/Despesa";
import logger from "../config/logger";
import { DateMapper } from "@mapper/date-mapper";
import { BuscaCategoriaEspecifica } from "@usecase/busca-categoria-especifica";
import { BuscaTipoPagamentoEspecifico } from "@usecase/busca-tipo-pagamento-especifico";
import { HttpException } from "@entity/HttpException";

export class CadastraDespesa {
  constructor(
    private readonly despesaRepository: DespesaRepository,
    private readonly buscaCategoriaEspecficica: BuscaCategoriaEspecifica,
    private readonly buscaTipoPagamentoEspecifico: BuscaTipoPagamentoEspecifico,
    private readonly viaCepRepository: ViaCepRepository
  ) {}

  async execute(dto: PersistDespesaDto): Promise<ResponseDto> {
    logger.info("[use-case] Cadastrando despesa: %o", dto);
    await this.buscaCategoriaEspecficica.execute(dto.categoriaId);
    await this.buscaTipoPagamentoEspecifico.execute(dto.tipoPagamentoId);
    // const viaCep = await this.viaCepRepository.findByCep(dto.cep);
    // if (!viaCep || !viaCep?.cep) {
    //   throw new HttpException(400, "CEP não encontrado");
    // }
    const despesa = new Despesa(
      undefined,
      dto.valor || 0,
      DateMapper.from(dto.data),
      dto.descricao,
      dto.tipoPagamentoId,
      dto.categoriaId,
      dto.cep,
      "Rua Siria",
      dto.numero,
      "",
      "Petropolis",
      "Novo Hamburgo",
      "RS"
    );
    const result = await this.despesaRepository.save(despesa);
    if (!result) {
      throw new HttpException(500, "Erro ao salvar despesa");
    }
    logger.info("[use-case] Despesa cadastrada com sucesso com id %d", result);
    return new ResponseDto(`Despesa ${result} criada`, true);
  }
}
