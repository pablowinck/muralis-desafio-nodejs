import { TipoPagamentoRepository } from "@repository/tipo-pagamento-repository";
import { TipoPagamento } from "@entity/TipoPagamento";
import { HttpException } from "@entity/HttpException";

export class TipoPagamentoMemoryRepository implements TipoPagamentoRepository {
  findById(id: number): Promise<TipoPagamento> {
    if (id != 1)
      throw new HttpException(404, "Tipo de Pagamento não encontrado");
    return Promise.resolve(new TipoPagamento(1, "dinheiro"));
  }
}
