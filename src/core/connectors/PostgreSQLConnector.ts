import { Pool, PoolClient } from "pg";
import { DatabaseConnector } from "./DatabaseConnector";
import logger from "../config/logger";
import { DatabaseConfig } from "../config/DatabaseConfig";

export class PostgreSQLConnector implements DatabaseConnector {
  private client: Pool;

  constructor(readonly config: DatabaseConfig) {
    this.client = new Pool({
      connectionString: config.connectionString,
    });
    this.client.on("error", (err) => {
      logger.info("Unexpected error on idle client", err);
    });
    this.client.on("connect", () => {
      logger.info("Database connected");
    });
  }

  async connect(): Promise<void> {
    await this.client.connect();
  }

  async disconnect(): Promise<void> {
    await this.client.end();
  }

  async getClient(): Promise<PoolClient> {
    return await this.client.connect();
  }
}
