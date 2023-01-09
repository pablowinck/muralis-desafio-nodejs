import { DetalheDespesaDto } from "@dto/detalhe-despesa-dto";
import { Page } from "@entity/Page";
import { Pageable } from "@entity/Pageable";
import { Despesa } from "@entity/Despesa";

export interface DespesaRepository {
  findByMesAtual: (options?: Pageable) => Promise<Page<DetalheDespesaDto>>;
  findByPeriodo: (options: {
    size: number;
    dataFim: string;
    page: number;
    dataInicio: string;
  }) => Promise<Page<DetalheDespesaDto>>;
  findById: (id: number) => Promise<DetalheDespesaDto | undefined>;
  existsById: (id: number) => Promise<boolean>;
  save: (despesa: Despesa) => Promise<number | undefined>;
  update(id: number, dto: any): Promise<void>;
  deleteById(id: number): void;
}
