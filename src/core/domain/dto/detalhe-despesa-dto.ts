import { Categoria } from "../entity/Categoria";
import { TipoPagamento } from "../entity/TipoPagamento";
import { ResponseDespesaByMes } from "../responses/response-despesa-by-mes";

export class DetalheDespesaDto {
  id: number;
  valor: number;
  data: string;
  descricao: string;
  bairro: string;
  cidade: string;
  estado: string;
  CEP: string;
  logradouro: string;
  categoria: Categoria;
  tipoPagamento: TipoPagamento;

  static from(responseDespesaByMes: ResponseDespesaByMes): DetalheDespesaDto {
    const id = responseDespesaByMes.iddespesa;
    const valor = responseDespesaByMes.valor;
    const data = responseDespesaByMes.datacompra.toISOString()?.split("T")[0];
    const descricao = responseDespesaByMes.descricaodespesa;
    const bairro = responseDespesaByMes.bairro;
    const cidade = responseDespesaByMes.cidade;
    const estado = responseDespesaByMes.estado;
    const CEP = responseDespesaByMes.CEP;
    const logradouro = responseDespesaByMes.logradouro;
    const categoria = new Categoria(
      responseDespesaByMes.idcategoria,
      responseDespesaByMes.nomecategoria,
      responseDespesaByMes.descricaocategoria
    );
    const tipoPagamento = new TipoPagamento(
      responseDespesaByMes.idtipopagamento,
      responseDespesaByMes.tipopagamento
    );
    return new DetalheDespesaDto(
      id,
      valor,
      data,
      descricao,
      bairro,
      cidade,
      estado,
      CEP,
      logradouro,
      categoria,
      tipoPagamento
    );
  }
  constructor(
    id: number,
    valor: number,
    data: string,
    descricao: string,
    bairro: string,
    cidade: string,
    estado: string,
    CEP: string,
    logradouro: string,
    categoria: Categoria,
    tipoPagamento: TipoPagamento
  ) {
    this.id = id;
    this.valor = valor;
    this.data = data;
    this.descricao = descricao;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
    this.CEP = CEP;
    this.logradouro = logradouro;
    this.categoria = categoria;
    this.tipoPagamento = tipoPagamento;
  }
}
