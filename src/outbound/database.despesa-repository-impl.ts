import { DespesaRepository } from "../core/repository/despesa-repository";
import { Page } from "../core/domain/entity/Page";
import { DespesaDto } from "../core/domain/dto/despesa-dto";
import logger from "../core/config/logger";
import { DatabaseConnection } from "../core/connections/database-connection";
import { Pageable } from "../core/domain/entity/Pageable";

export class DatabaseDespesaRepositoryImpl implements DespesaRepository {
  private readonly client: DatabaseConnection;

  constructor(client: DatabaseConnection) {
    this.client = client;
  }

  async findDespesaByMesAtual(options: Pageable): Promise<Page<DespesaDto>> {
    const result = await this.client.query("SELECT * FROM despesa");
    logger.info("Despesas do mês atual buscadas com sucesso: %o", result);
    return new Page<DespesaDto>([], 0, 0, 0, 0);
  }
}
