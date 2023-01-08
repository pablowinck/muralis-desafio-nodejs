import { DetalheDespesaDto } from "../domain/dto/detalhe-despesa-dto";
import { Page } from "../domain/entity/Page";
import { Pageable } from "../domain/entity/Pageable";
import { Despesa } from "../domain/entity/Despesa";

export interface DespesaRepository {
  findDespesaByMesAtual: (
    options?: Pageable
  ) => Promise<Page<DetalheDespesaDto>>;
  findDespesaByDatas: (options: {
    size: number;
    dataFim: string;
    page: number;
    dataInicio: string;
  }) => Promise<Page<DetalheDespesaDto>>;
  save: (despesa: Despesa) => Promise<number | undefined>;
}
