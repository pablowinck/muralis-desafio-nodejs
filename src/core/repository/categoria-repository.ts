import { Categoria } from "../domain/entity/Categoria";

export interface CategoriaRepository {
  findById: (id: number) => Promise<Categoria>;
}
