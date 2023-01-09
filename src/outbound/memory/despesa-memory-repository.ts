import { DespesaRepository } from "@repository/despesa-repository";
import { Pageable } from "@entity/Pageable";
import { Page } from "@entity/Page";
import { DetalheDespesaDto } from "@dto/detalhe-despesa-dto";
import { Despesa } from "@entity/Despesa";
import { ResponseDespesaDetalhadaDto } from "@dto/response-despesa-detalhada-dto";

export class DespesaMemoryRepository implements DespesaRepository {
  despesas: Despesa[] = [];

  constructor() {
    this.despesas = [];
  }

  async deleteById(id: number): Promise<void> {
    this.despesas = this.despesas.filter((d) => d.id !== id);
    return Promise.resolve();
  }

  async update(id: number, dto: any): Promise<void> {
    this.despesas = this.despesas.map((despesa) => {
      if (despesa.id === id) {
        return new Despesa(
          despesa.id,
          dto.valor,
          dto.dataCompra,
          dto.descricao,
          dto.idTipoPagamento,
          dto.idCategoria,
          dto.CEP,
          dto.logradouro,
          dto.numero,
          dto.complemento,
          dto.bairro,
          dto.cidade,
          dto.estado
        );
      }
      return despesa;
    });

    return Promise.resolve();
  }

  existsById(id: number): Promise<boolean> {
    return Promise.resolve(!!this.despesas.find((d) => d.id === id));
  }

  findById(id: number): Promise<DetalheDespesaDto | undefined> {
    const despesa = this.despesas.find((d) => d.id === id);
    if (!despesa) return Promise.resolve(undefined);
    const response: ResponseDespesaDetalhadaDto = {
      iddespesa: despesa.id || 0,
      valor: despesa.valor,
      datacompra: despesa.dataCompra,
      descricaodespesa: despesa.descricao,
      bairro: despesa.bairro,
      cidade: despesa.cidade,
      estado: despesa.estado,
      cep: despesa.CEP,
      numero: despesa.numero,
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
        const response: ResponseDespesaDetalhadaDto = {
          iddespesa: despesa.id || 0,
          valor: despesa.valor,
          datacompra: despesa.dataCompra,
          descricaodespesa: despesa.descricao,
          bairro: despesa.bairro,
          cidade: despesa.cidade,
          estado: despesa.estado,
          cep: despesa.CEP,
          numero: despesa.numero,
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
    try {
      if (despesa.descricao === "erro") return 0;
      if (!despesa.id) {
        despesa.id = this.generateId();
        this.despesas.push(despesa);
      }
      this.despesas.splice(
        this.despesas.findIndex((d) => d.id === despesa.id),
        1,
        despesa
      );
      return Promise.resolve(despesa.id || 0);
    } catch (error) {
      return 0;
    }
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
        const response: ResponseDespesaDetalhadaDto = {
          iddespesa: despesa.id || 0,
          valor: despesa.valor,
          datacompra: despesa.dataCompra,
          descricaodespesa: despesa.descricao,
          bairro: despesa.bairro,
          cidade: despesa.cidade,
          estado: despesa.estado,
          cep: despesa.CEP,
          numero: despesa.numero,
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
