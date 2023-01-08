import { DespesaRepository } from "../repository/despesa-repository";
import { CategoriaRepository } from "../repository/categoria-repository";
import { TipoPagamentoRepository } from "../repository/tipo-pagamento-repository";
import { CadastraDespesaDto } from "../domain/dto/cadastra-despesa-dto";
import { PersistResponseDto } from "../domain/dto/persist-response-dto";
import { ViaCepRepository } from "../repository/via-cep-repository";
import { Despesa } from "../domain/entity/Despesa";
import logger from "../config/logger";
import { DateMapper } from "../domain/mapper/date-mapper";

export class CadastraDespesa {
  constructor(
    private readonly despesaRepository: DespesaRepository,
    private readonly categoriaRepository: CategoriaRepository,
    private readonly tipoPagamentoRepository: TipoPagamentoRepository,
    private readonly viaCepRepository: ViaCepRepository
  ) {}

  async execute(dto: CadastraDespesaDto): Promise<PersistResponseDto> {
    logger.info("[use-case] Cadastrando despesa: %o", dto);
    const categoria = await this.categoriaRepository.findById(dto.categoriaId);
    if (!categoria)
      return new PersistResponseDto("Categoria não encontrada", false);
    const tipoPagamento = await this.tipoPagamentoRepository.findById(
      dto.tipoPagamentoId
    );
    if (!tipoPagamento) {
      return new PersistResponseDto("Tipo de pagamento não encontrado", false);
    }
    const viaCep = await this.viaCepRepository.findByCep(dto.cep);
    if (!viaCep || !viaCep?.cep) {
      return new PersistResponseDto("CEP não encontrado", false);
    }
    const despesa = new Despesa(
      undefined,
      dto.valor || 0,
      DateMapper.from(dto.data),
      dto.descricao,
      dto.tipoPagamentoId,
      dto.categoriaId,
      dto.cep,
      viaCep?.logradouro || "",
      dto.numero,
      viaCep?.complemento || "",
      viaCep?.bairro || "",
      viaCep?.localidade || "",
      viaCep?.uf || ""
    );
    const result = await this.despesaRepository.save(despesa);
    if (!result) {
      return new PersistResponseDto("Erro ao salvar a despesa", false);
    }
    logger.info("[use-case] Despesa cadastrada com sucesso com id %d", result);
    return new PersistResponseDto(`Despesa ${result} criada`, true);
  }
}
