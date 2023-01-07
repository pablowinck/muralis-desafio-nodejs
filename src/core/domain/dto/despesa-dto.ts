import { Categoria } from "../entity/Categoria";
import { TipoPagamento } from "../entity/TipoPagamento";

export class DespesaDto {
  constructor(
    readonly id: number,
    readonly valor: number,
    readonly data: string,
    readonly categoria: Categoria,
    readonly tipoPagamento: TipoPagamento
  ) {}
}
