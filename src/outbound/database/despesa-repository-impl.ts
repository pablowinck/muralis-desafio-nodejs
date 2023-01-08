import { DespesaRepository } from "../../core/repository/despesa-repository";
import { Page } from "../../core/domain/entity/Page";
import { DespesaDto } from "../../core/domain/dto/despesa-dto";
import logger from "../../core/config/logger";
import { DatabaseConnection } from "../../core/connections/database-connection";
import { Pageable } from "../../core/domain/entity/Pageable";
import { ResponseDespesaByMes } from "../../core/domain/responses/response-despesa-by-mes";

export class DespesaRepositoryImpl implements DespesaRepository {
  private readonly client: DatabaseConnection;

  constructor(client: DatabaseConnection) {
    this.client = client;
  }

  async findDespesaByMesAtual(
    options: Pageable = new Pageable(0, 10)
  ): Promise<Page<DespesaDto>> {
    logger.info("[repository] Buscando despesas do mes atual: %o", options);
    const response = await this.client.query<ResponseDespesaByMes[]>(
      `SELECT d.id         AS idDespesa,
                    d.valor      AS valor,
                    d.dataCompra AS dataCompra,
                    d.descricao  AS descricaoDespesa,
                    d.bairro     AS bairro,
                    d.cidade     AS cidade,
                    d.estado     AS estado,
                    d.CEP        AS CEP,
                    d.logradouro AS logradouro,
                    t.id         AS idTipoPagamento,
                    t.tipo       AS tipoPagamento,
                    c.id         AS idCategoria,
                    c.nome       AS nomeCategoria,
                    c.descricao  AS descricaoCategoria
             FROM despesa d
                      LEFT JOIN categoria c ON d.idcategoria = c.id
                      LEFT JOIN tipopagamento t on t.id = d.idtipopagamento
             WHERE EXTRACT(MONTH FROM d.datacompra) = EXTRACT(MONTH FROM CURRENT_DATE)
             LIMIT $1 OFFSET $2`,
      [options.size, options.page * options.size]
    );
    const despesas: DespesaDto[] = response.map((despesa) =>
      DespesaDto.from(despesa)
    );
    logger.info("[repository] Despesas do mes atual buscadas com sucesso");
    const [{ count }] = await this.client.query<{ count: number }[]>(
      `SELECT COUNT(*)
             FROM despesa
             WHERE EXTRACT(MONTH FROM datacompra) = EXTRACT(MONTH FROM CURRENT_DATE)`
    );
    logger.info("[repository] Total de %o despesas no mes atual", count);
    return new Page<DespesaDto>(
      despesas,
      options.page,
      despesas.length,
      +count,
      +(count / options.size).toFixed(0)
    );
  }
}
