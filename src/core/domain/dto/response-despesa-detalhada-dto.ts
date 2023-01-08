export interface ResponseDespesaDetalhadaDto {
  iddespesa: number;
  valor: number;
  datacompra: Date;
  descricaodespesa: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  numero: string;
  logradouro: string;
  idtipopagamento: number;
  tipopagamento: string;
  idcategoria: number;
  nomecategoria: string;
  descricaocategoria: string;
}
