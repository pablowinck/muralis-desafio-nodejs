import { TipoPagamentoRepository } from "@repository/tipo-pagamento-repository";
import { TipoPagamento } from "@entity/TipoPagamento";
import { HttpException } from "@entity/HttpException";

export class TipoPagamentoMemoryRepository implements TipoPagamentoRepository {
  tiposPagamento: TipoPagamento[] = [];

  constructor() {
    this.tiposPagamento.push(new TipoPagamento(1, "dinheiro"));
  }

  findById(id: number): Promise<TipoPagamento> {
    if (id != 1)
      throw new HttpException(404, "Tipo de Pagamento não encontrado");
    return Promise.resolve(this.tiposPagamento[0]);
  }

  findAll(): Promise<TipoPagamento[]> {
    return Promise.resolve(this.tiposPagamento);
  }
}
