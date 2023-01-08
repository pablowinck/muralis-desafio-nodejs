import { IsNumber, Matches, MinLength } from "class-validator";

export class PersistDespesaDto {
  @MinLength(3, {
    message: "A descrição deve ter no mínimo 3 caracteres",
  })
  descricao: string;
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 2,
    },
    {
      message: "Valor deve ser um número válido",
    }
  )
  valor: number;
  @MinLength(8, {
    message: "CEP deve ter no minimo 8 caracteres",
  })
  cep: string;
  @MinLength(1, {
    message: "Numero deve ter no minimo 1 caracter",
  })
  numero: string;
  @Matches(
    new RegExp(
      "^(0[1-9]|1[0-9]|2[0-9]|3[0,1])([/+-])(0[1-9]|1[0-2])([/+-])(19|20)[0-9]{2}$"
    ),
    {
      message: "Data deve estar no formato dd/mm/aaaa",
    }
  )
  data: string;
  categoriaId: number;
  tipoPagamentoId: number;

  constructor(
    descricao: string,
    valor: number,
    cep: string,
    numero: string,
    data: string,
    categoriaId: number,
    tipoPagamentoId: number
  ) {
    this.descricao = descricao;
    this.valor = valor;
    this.cep = cep;
    this.numero = numero;
    this.data = data;
    this.categoriaId = categoriaId;
    this.tipoPagamentoId = tipoPagamentoId;
  }
}
