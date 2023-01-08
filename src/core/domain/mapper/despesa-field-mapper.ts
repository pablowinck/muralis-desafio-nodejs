import { DateMapper } from "@mapper/date-mapper";

const possibilites = [
  { name: "data", value: "dataCompra" },
  { name: "valor", value: "valor" },
  { name: "descricao", value: "descricao" },
  { name: "tipoPagamentoId", value: "idTipoPagamento" },
  { name: "categoriaId", value: "idCategoria" },
  { name: "cep", value: "CEP" },
];

export class DespesaFieldMapper {
  static mapKey(field: string): string {
    const result = possibilites.find(
      (possibility) => possibility.name === field
    );
    if (result) {
      return result.value;
    }
    return field;
  }

  static mapFields(object: any): any {
    if (Object.keys(object).includes("dataCompra")) {
      object.dataCompra = DateMapper.from(object.dataCompra);
    }
    if (
      Object.keys(object).includes("valor") &&
      typeof object.valor === "string"
    ) {
      object.valor = Number(
        object.valor.replace(",", ".").replace(/[^0-9.,]/g, "")
      );
    }
    return object;
  }

  static map(object: any): any {
    Object.keys(object).forEach((key) => {
      const mappedKey = this.mapKey(key);
      if (mappedKey !== key) {
        object[mappedKey] = object[key];
        delete object[key];
      }
    });
    return this.mapFields(object);
  }
}
