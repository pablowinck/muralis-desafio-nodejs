import { CategoriaRepository } from "@repository/categoria-repository";
import logger from "@core/config/logger";

export class BuscaTodasCategorias {
  constructor(private readonly repository: CategoriaRepository) {}

  async execute() {
    logger.info("Buscando todas as categorias");
    const categorias = await this.repository.findAll();
    logger.info(`${categorias.length} categorias encontradas`);
    return categorias;
  }
}
