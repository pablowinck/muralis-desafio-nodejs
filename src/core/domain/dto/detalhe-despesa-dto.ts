import { Categoria } from "@entity/Categoria";
import { TipoPagamento } from "@entity/TipoPagamento";
import { ValorMapper } from "@mapper/valor-mapper";
import { DateMapper } from "@mapper/date-mapper";
import { ResponseDespesaDetalhadaDto } from "@dto/response-despesa-detalhada-dto";
import logger from "@core/config/logger";

export class DetalheDespesaDto {
  id: number;
  valor: string;
  data: string;
  descricao: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  numero: string;
  logradouro: string;
  categoria: Categoria;
  tipoPagamento: TipoPagamento;

  static from(
    responseDespesaByMes: ResponseDespesaDetalhadaDto
  ): DetalheDespesaDto {
    logger.info("numero: " + responseDespesaByMes.numero);
    const id = responseDespesaByMes.iddespesa;
    const valor = ValorMapper.format(+responseDespesaByMes.valor);
    const data = DateMapper.format(responseDespesaByMes.datacompra);
    const descricao = responseDespesaByMes.descricaodespesa;
    const bairro = responseDespesaByMes.bairro;
    const cidade = responseDespesaByMes.cidade;
    const estado = responseDespesaByMes.estado;
    const cep = responseDespesaByMes.cep;
    const numero = responseDespesaByMes.numero;
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
      cep,
      numero,
      logradouro,
      categoria,
      tipoPagamento
    );
  }

  constructor(
    id: number,
    valor: string,
    data: string,
    descricao: string,
    bairro: string,
    cidade: string,
    estado: string,
    cep: string,
    numero: string,
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
    this.cep = cep;
    this.numero = numero;
    this.logradouro = logradouro;
    this.categoria = categoria;
    this.tipoPagamento = tipoPagamento;
  }
}
