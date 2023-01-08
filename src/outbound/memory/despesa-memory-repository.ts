import { DespesaRepository } from "@repository/despesa-repository";
import { Pageable } from "@entity/Pageable";
import { Page } from "@entity/Page";
import { DetalheDespesaDto } from "@dto/detalhe-despesa-dto";
import { Despesa } from "@entity/Despesa";
import { ResponseDespesaDetalhada } from "@responses/response-despesa-detalhada";

export class DespesaMemoryRepository implements DespesaRepository {
  constructor(readonly despesas: Despesa[] = []) {}

  findById(id: number): Promise<DetalheDespesaDto | undefined> {
    const despesa = this.despesas.find((d) => d.id === id);
    if (!despesa) return Promise.resolve(undefined);
    const response: ResponseDespesaDetalhada = {
      iddespesa: despesa.id || 0,
      valor: despesa.valor,
      datacompra: despesa.dataCompra,
      descricaodespesa: despesa.descricao,
      bairro: despesa.bairro,
      cidade: despesa.cidade,
      estado: despesa.estado,
      CEP: despesa.CEP,
      logradouro: despesa.logradouro,
      idtipopagamento: 123,
      tipopagamento: "aleatorio",
      idcategoria: 123,
      nomecategoria: "aleatorio",
      descricaocategoria: "aleatorio",
    };
    return Promise.resolve(DetalheDespesaDto.from(response));
  }

  async findByPeriodo(options: {
    size: number;
    dataFim: string;
    page: number;
    dataInicio: string;
  }): Promise<Page<DetalheDespesaDto>> {
    const detalhes = this.despesas
      .filter(
        (d) =>
          d.dataCompra.getDate() >= new Date(options.dataInicio).getDate() &&
          d.dataCompra.getDate() <= new Date(options.dataFim).getDate()
      )
      .map((despesa) => {
        const response: ResponseDespesaDetalhada = {
          iddespesa: despesa.id || 0,
          valor: despesa.valor,
          datacompra: despesa.dataCompra,
          descricaodespesa: despesa.descricao,
          bairro: despesa.bairro,
          cidade: despesa.cidade,
          estado: despesa.estado,
          CEP: despesa.CEP,
          logradouro: despesa.logradouro,
          idtipopagamento: 123,
          tipopagamento: "aleatorio",
          idcategoria: 123,
          nomecategoria: "aleatorio",
          descricaocategoria: "aleatorio",
        };
        return DetalheDespesaDto.from(response);
      });

    return Promise.resolve(
      new Page<DetalheDespesaDto>(
        detalhes,
        options.page,
        options.size,
        detalhes.length,
        +(detalhes.length / options.size).toFixed(0)
      )
    );
  }

  generateId(): number {
    let id = parseInt((Math.random() * 1000).toFixed(0));
    while (this.despesas.find((d) => d.id === id)) {
      id = parseInt((Math.random() * 1000).toFixed(0));
    }
    return id;
  }
  async save(despesa: Despesa): Promise<number> {
    despesa.id = this.generateId();
    this.despesas.push(despesa);
    return Promise.resolve(despesa.id || 0);
  }

  async findByMesAtual(
    options: Pageable | undefined
  ): Promise<Page<DetalheDespesaDto>> {
    const detalhes = this.despesas
      .filter(
        (d) =>
          d.dataCompra.getMonth() === new Date().getMonth() &&
          d.dataCompra.getFullYear() === new Date().getFullYear()
      )
      .map((despesa) => {
        const response: ResponseDespesaDetalhada = {
          iddespesa: despesa.id || 0,
          valor: despesa.valor,
          datacompra: despesa.dataCompra,
          descricaodespesa: despesa.descricao,
          bairro: despesa.bairro,
          cidade: despesa.cidade,
          estado: despesa.estado,
          CEP: despesa.CEP,
          logradouro: despesa.logradouro,
          idtipopagamento: 123,
          tipopagamento: "aleatorio",
          idcategoria: 123,
          nomecategoria: "aleatorio",
          descricaocategoria: "aleatorio",
        };
        return DetalheDespesaDto.from(response);
      });

    return Promise.resolve(
      new Page<DetalheDespesaDto>(
        detalhes,
        options?.page || 0,
        options?.size || 10,
        detalhes.length,
        +(detalhes.length / (options?.size || 10)).toFixed(0)
      )
    );
  }
}
