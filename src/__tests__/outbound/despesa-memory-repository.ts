import { DespesaRepository } from "../../core/repository/despesa-repository";
import { Pageable } from "../../core/domain/entity/Pageable";
import { Page } from "../../core/domain/entity/Page";
import { DespesaDto } from "../../core/domain/dto/despesa-dto";
import { Categoria } from "../../core/domain/entity/Categoria";
import { TipoPagamento } from "../../core/domain/entity/TipoPagamento";

export class DespesaMemoryRepository implements DespesaRepository {
  async findDespesaByMesAtual(
    _: Pageable | undefined
  ): Promise<Page<DespesaDto>> {
    const despesa = new DespesaDto(
      1,
      100,
      "2021-01-01",
      "descricao",
      "bairro",
      "cidade",
      "estado",
      "CEP",
      "logradouro",
      new Categoria(1, "nome", "descricao"),
      new TipoPagamento(1, "nome")
    );

    return Promise.resolve(new Page<DespesaDto>([despesa], 0, 0, 0, 0));
  }
}
