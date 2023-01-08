import { Despesa } from "@entity/Despesa";

export class DespesaFactory {
  static valores = [100, 200, 300, 400, 500, 600];
  static datas = [
    "2023-01-01",
    "2023-01-02",
    "2023-01-03",
    "2023-01-04",
    "2023-01-05",
    "2023-01-06",
  ];
  static descricoes = [
    "teste1",
    "teste2",
    "teste3",
    "teste4",
    "teste5",
    "teste6",
  ];
  static ids = [12315423, 12315424, 12315425, 12315426, 12315427, 12315428];
  static ceps = [
    "93346140",
    "93346141",
    "93346142",
    "93346143",
    "93346144",
    "93346145",
  ];
  static logradouros = [
    "rua teste1",
    "rua teste2",
    "rua teste3",
    "rua teste4",
    "rua teste5",
    "rua teste6",
  ];
  static numeros = ["123", "124", "125", "126", "127", "128"];
  static complementos = [
    "casa",
    "apartamento",
    "posto",
    "padaria",
    "shopping",
    "armazem",
  ];
  static bairros = [
    "bairro teste1",
    "bairro teste2",
    "bairro teste3",
    "bairro teste4",
    "bairro teste5",
    "bairro teste6",
  ];
  static cidades = [
    "cidade teste1",
    "cidade teste2",
    "cidade teste3",
    "cidade teste4",
    "cidade teste5",
    "cidade teste6",
  ];
  static estados = [
    "estado teste1",
    "estado teste2",
    "estado teste3",
    "estado teste4",
    "estado teste5",
    "estado teste6",
  ];

  static execute(): Despesa {
    return new Despesa(
      undefined,
      this.valores[Math.floor(Math.random() * this.valores.length)],
      new Date(this.datas[Math.floor(Math.random() * this.datas.length)]),
      this.descricoes[Math.floor(Math.random() * this.descricoes.length)],
      this.ids[Math.floor(Math.random() * this.ids.length)],
      this.ids[Math.floor(Math.random() * this.ids.length)],
      this.ceps[Math.floor(Math.random() * this.ceps.length)],
      this.logradouros[Math.floor(Math.random() * this.logradouros.length)],
      this.numeros[Math.floor(Math.random() * this.numeros.length)],
      this.complementos[Math.floor(Math.random() * this.complementos.length)],
      this.bairros[Math.floor(Math.random() * this.bairros.length)],
      this.cidades[Math.floor(Math.random() * this.cidades.length)],
      this.estados[Math.floor(Math.random() * this.estados.length)]
    );
  }
}
