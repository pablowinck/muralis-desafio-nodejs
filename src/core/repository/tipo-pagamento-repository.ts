import { TipoPagamento } from "@entity/TipoPagamento";

export interface TipoPagamentoRepository {
  findById: (id: number) => Promise<TipoPagamento>;
  findAll: () => Promise<TipoPagamento[]>;
}
