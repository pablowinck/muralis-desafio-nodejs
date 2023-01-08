import { DatabaseConnection } from "../../core/connections/database-connection";
import { TipoPagamentoRepository } from "../../core/repository/tipo-pagamento-repository";
import { TipoPagamento } from "../../core/domain/entity/TipoPagamento";

export class TipoPagamentoRepositoryImpl implements TipoPagamentoRepository {
  private readonly client: DatabaseConnection;

  constructor(client: DatabaseConnection) {
    this.client = client;
  }

  async findById(id: number): Promise<TipoPagamento> {
    const [tipoPagamento] = await this.client.query<[TipoPagamento]>(
      `SELECT *
             FROM tipopagamento
             WHERE id = $1`,
      [id]
    );
    return tipoPagamento;
  }
}
