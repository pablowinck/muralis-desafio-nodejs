import { TipoPagamento } from "../domain/entity/TipoPagamento";

export interface TipoPagamentoRepository {
  findById: (id: number) => Promise<TipoPagamento>;
}