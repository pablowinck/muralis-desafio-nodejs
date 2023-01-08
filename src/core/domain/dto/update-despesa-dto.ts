import { PersistDespesaDto } from "@dto/persist-despesa-dto";
import { Despesa } from "@entity/Despesa";
import { DateMapper } from "@mapper/date-mapper";

export class UpdateDespesaDto extends PersistDespesaDto {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  constructor(
    valor: number,
    dataCompra: string,
    descricao: string,
    idTipoPagamento: number,
    idCategoria: number,
    CEP: string,
    logradouro: string,
    numero: string,
    complemento: string,
    bairro: string,
    cidade: string,
    estado: string
  ) {
    super(
      descricao,
      valor,
      CEP,
      numero,
      dataCompra,
      idCategoria,
      idTipoPagamento
    );
    this.logradouro = logradouro;
    this.numero = numero;
    this.complemento = complemento;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
  }

  toEntity(id: number): Despesa {
    return new Despesa(
      id,
      this.valor,
      DateMapper.from(this.data),
      this.descricao,
      this.tipoPagamentoId,
      this.categoriaId,
      this.cep,
      this.logradouro,
      this.numero,
      this.complemento,
      this.bairro,
      this.cidade,
      this.estado
    );
  }
}
