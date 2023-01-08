import { DespesaRepository } from "../../core/repository/despesa-repository";
import { Pageable } from "../../core/domain/entity/Pageable";
import { Page } from "../../core/domain/entity/Page";
import { DetalheDespesaDto } from "../../core/domain/dto/detalhe-despesa-dto";
import { Categoria } from "../../core/domain/entity/Categoria";
import { TipoPagamento } from "../../core/domain/entity/TipoPagamento";
import { Despesa } from "../../core/domain/entity/Despesa";

export class DespesaMemoryRepository implements DespesaRepository {
  save(_: Despesa): Promise<number> {
    return Promise.resolve(0);
  }
  async findDespesaByMesAtual(
    _: Pageable | undefined
  ): Promise<Page<DetalheDespesaDto>> {
    const despesa = new DetalheDespesaDto(
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

    return Promise.resolve(new Page<DetalheDespesaDto>([despesa], 0, 0, 0, 0));
  }
}
