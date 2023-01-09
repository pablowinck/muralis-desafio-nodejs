import { CategoriaRepository } from "@repository/categoria-repository";
import { Categoria } from "@entity/Categoria";
import { HttpException } from "@entity/HttpException";

export class CategoriaMemoryRepository implements CategoriaRepository {
  categorias: Categoria[] = [];

  constructor() {
    this.categorias.push(new Categoria(1, "teste", "teste"));
  }

  findById(id: number): Promise<Categoria> {
    if (id != 1) throw new HttpException(404, "Categoria não encontrada");
    return Promise.resolve(this.categorias[0]);
  }

  findAll(): Promise<Categoria[]> {
    return Promise.resolve(this.categorias);
  }
}
