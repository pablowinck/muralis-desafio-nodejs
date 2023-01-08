import { CategoriaRepository } from "../../core/repository/categoria-repository";
import { DatabaseConnection } from "../../core/connections/database-connection";
import { Categoria } from "../../core/domain/entity/Categoria";

export class CategoriaRepositoryImpl implements CategoriaRepository {
  private readonly client: DatabaseConnection;

  constructor(client: DatabaseConnection) {
    this.client = client;
  }

  async findById(id: number): Promise<Categoria> {
    const [categoria] = await this.client.query<[Categoria]>(
      `SELECT * FROM categoria WHERE id = $1`,
      [id]
    );
    return categoria;
  }
}
