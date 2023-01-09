import { DetalheDespesaDto } from "@dto/detalhe-despesa-dto";

export class DetalheRelatorioDto {
  constructor(
    readonly data: string,
    readonly descricao: string,
    readonly valor: string,
    readonly tipo: string,
    readonly categoria: string,
    readonly logradouro: string,
    readonly numero: string,
    readonly bairro: string,
    readonly cidade: string,
    readonly estado: string,
    readonly cep: string
  ) {}

  static from(detalheDespesaDto: DetalheDespesaDto): DetalheRelatorioDto {
    return new DetalheRelatorioDto(
      detalheDespesaDto.data || "",
      this.retiraAcentos(detalheDespesaDto.descricao),
      detalheDespesaDto.valor.replace("R$ ", ""),
      this.retiraAcentos(detalheDespesaDto.tipoPagamento.tipo),
      this.retiraAcentos(
        `${detalheDespesaDto.categoria.nome} - ${detalheDespesaDto.categoria.descricao}`
      ),
      this.retiraAcentos(detalheDespesaDto.logradouro),
      detalheDespesaDto.numero || "",
      this.retiraAcentos(detalheDespesaDto.bairro),
      this.retiraAcentos(detalheDespesaDto.cidade),
      this.retiraAcentos(detalheDespesaDto.estado),
      detalheDespesaDto.cep || ""
    );
  }

  private static retiraAcentos(str: string): string {
    if (!str) return "";
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
