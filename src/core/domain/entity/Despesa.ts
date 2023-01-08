export class Despesa {
  constructor(
    readonly id: number | undefined,
    readonly valor: number,
    readonly dataCompra: Date,
    readonly descricao: string,
    readonly idTipoPagamento: number,
    readonly idCategoria: number,
    readonly CEP: string,
    readonly logradouro: string,
    readonly numero: string,
    readonly complemento: string,
    readonly bairro: string,
    readonly cidade: string,
    readonly estado: string
  ) {}
}
