import { Categoria } from "@entity/Categoria";

export interface CategoriaRepository {
  findById: (id: number) => Promise<Categoria>;
}
