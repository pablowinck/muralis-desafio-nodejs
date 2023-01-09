import { CategoriaRepository } from "@repository/categoria-repository";
import { DatabaseConnection } from "@connections/database-connection";
import { Categoria } from "@entity/Categoria";

export class CategoriaRepositoryImpl implements CategoriaRepository {
  private readonly client: DatabaseConnection;

  constructor(client: DatabaseConnection) {
    this.client = client;
  }

  async findById(id: number): Promise<Categoria> {
    const [categoria] = await this.client.query<[Categoria]>(
      `SELECT *
             FROM categoria
             WHERE id = $1`,
      [id]
    );
    return categoria;
  }

  async findAll(): Promise<Categoria[]> {
    return this.client.query<Categoria[]>(
      `SELECT *
                FROM categoria`
    );
  }
}
