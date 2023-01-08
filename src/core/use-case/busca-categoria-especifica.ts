import { Categoria } from "@entity/Categoria";
import { CategoriaRepository } from "@repository/categoria-repository";
import { HttpException } from "@entity/HttpException";
import logger from "@core/config/logger";

export class BuscaCategoriaEspecifica {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  async execute(id: number): Promise<Categoria | undefined> {
    logger.info("[use-case] Buscando categoria com id %d", id);
    const categoria = await this.categoriaRepository.findById(id);
    if (!categoria) throw new HttpException(404, "Categoria não encontrada");
    logger.info("[use-case] Categoria encontrada: %o", categoria);
    return categoria;
  }
}
