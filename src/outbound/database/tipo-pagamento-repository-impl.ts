import { DatabaseConnection } from "@connections/database-connection";
import { TipoPagamentoRepository } from "@repository/tipo-pagamento-repository";
import { TipoPagamento } from "@entity/TipoPagamento";

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

  async findAll(): Promise<TipoPagamento[]> {
    return this.client.query<TipoPagamento[]>(
      `SELECT *
             FROM tipopagamento`
    );
  }
}
