import { DespesaRepository } from "../../core/repository/despesa-repository";
import { Page } from "../../core/domain/entity/Page";
import { DetalheDespesaDto } from "../../core/domain/dto/detalhe-despesa-dto";
import logger from "../../core/config/logger";
import { DatabaseConnection } from "../../core/connections/database-connection";
import { Pageable } from "../../core/domain/entity/Pageable";
import { ResponseDespesaDetalhada } from "../../core/domain/responses/response-despesa-detalhada";
import { Despesa } from "../../core/domain/entity/Despesa";

export class DespesaRepositoryImpl implements DespesaRepository {
  private readonly client: DatabaseConnection;

  constructor(client: DatabaseConnection) {
    this.client = client;
  }

  async findById(id: number): Promise<DetalheDespesaDto | undefined> {
    logger.info("[repository] Buscando despesa %o", id);
    const [response] = await this.client.query<[ResponseDespesaDetalhada]>(
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
             WHERE d.id = $1
             LIMIT 1`,
      [id]
    );
    if (!response) {
      logger.info("[repository] Despesa nao encontrada");
      return undefined;
    }
    logger.info("[repository] Despesa %o buscada com sucesso", id);
    return DetalheDespesaDto.from(response);
  }

  async save(despesa: Despesa): Promise<number | undefined> {
    try {
      logger.info("[repository] Salvando despesa: %o", despesa);
      await this.client.query(
        `INSERT INTO despesa (idcategoria, idtipopagamento, valor, datacompra, descricao, bairro, cidade,
                                      estado, cep, logradouro)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          despesa.idCategoria,
          despesa.idTipoPagamento,
          despesa.valor,
          despesa.dataCompra,
          despesa.descricao,
          despesa.bairro,
          despesa.cidade,
          despesa.estado,
          despesa.CEP,
          despesa.logradouro,
        ]
      );
      const [{ id }] = await this.client.query<{ id: number }[]>(
        `SELECT id
                 FROM despesa
                 ORDER BY id DESC
                 LIMIT 1`
      );
      logger.info(`[repository] Despesa ${id} salva com sucesso`);
      return id;
    } catch (error) {
      logger.error("[repository] Erro ao salvar despesa: %o", error);
      return undefined;
    }
  }

  async findByPeriodo(options: {
    size: number;
    dataFim: string;
    page: number;
    dataInicio: string;
  }): Promise<Page<DetalheDespesaDto>> {
    logger.info(
      "[repository] Buscando despesas entre %s e %s: %o",
      options.dataInicio,
      options.dataFim,
      options
    );
    const response = await this.client.query<ResponseDespesaDetalhada[]>(
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
             WHERE d.dataCompra BETWEEN $1 AND $2
             ORDER BY d.dataCompra DESC
             LIMIT $3 OFFSET $4`,
      [
        options.dataInicio,
        options.dataFim,
        options.size,
        options.page * options.size,
      ]
    );
    const despesas: DetalheDespesaDto[] = response.map((despesa) =>
      DetalheDespesaDto.from(despesa)
    );
    logger.info(
      "[repository] Despesas entre %s e %s buscadas com sucesso",
      options.dataInicio,
      options.dataFim
    );
    const [{ count }] = await this.client.query<{ count: number }[]>(
      `SELECT COUNT(*)
             FROM despesa
             WHERE dataCompra BETWEEN $1 AND $2`,
      [options.dataInicio, options.dataFim]
    );
    logger.info(
      "[repository] Total de %o despesas entre %s e %s",
      count,
      options.dataInicio,
      options.dataFim
    );
    return new Page<DetalheDespesaDto>(
      despesas,
      options.page,
      despesas.length,
      +count,
      +(count / options.size).toFixed(0)
    );
  }

  async findByMesAtual(
    options: Pageable = new Pageable(0, 10)
  ): Promise<Page<DetalheDespesaDto>> {
    logger.info("[repository] Buscando despesas do mes atual: %o", options);
    const response = await this.client.query<ResponseDespesaDetalhada[]>(
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
             ORDER BY d.dataCompra DESC
             LIMIT $1 OFFSET $2`,
      [options.size, options.page * options.size]
    );
    const despesas: DetalheDespesaDto[] = response.map((despesa) =>
      DetalheDespesaDto.from(despesa)
    );
    logger.info("[repository] Despesas do mes atual buscadas com sucesso");
    const [{ count }] = await this.client.query<{ count: number }[]>(
      `SELECT COUNT(*)
             FROM despesa
             WHERE EXTRACT(MONTH FROM datacompra) = EXTRACT(MONTH FROM CURRENT_DATE)`
    );
    logger.info("[repository] Total de %o despesas no mes atual", count);
    return new Page<DetalheDespesaDto>(
      despesas,
      options.page,
      despesas.length,
      +count,
      +(count / options.size).toFixed(0)
    );
  }
}
