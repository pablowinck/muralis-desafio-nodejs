export class CadastraDespesaDto {
  constructor(
    readonly descricao: string,
    readonly valor: number,
    readonly cep: string,
    readonly numero: string,
    readonly data: string,
    readonly categoriaId: number,
    readonly tipoPagamentoId: number
  ) {}
}
