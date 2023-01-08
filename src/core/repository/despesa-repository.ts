import { DespesaDto } from "../domain/dto/despesa-dto";
import { Page } from "../domain/entity/Page";
import { Pageable } from "../domain/entity/Pageable";

export interface DespesaRepository {
  findDespesaByMesAtual: (options?: Pageable) => Promise<Page<DespesaDto>>;
}
