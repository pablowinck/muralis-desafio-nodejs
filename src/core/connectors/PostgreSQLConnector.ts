import { Pool, PoolClient } from "pg";
import { DatabaseConnector } from "./DatabaseConnector";
import logger from "../config/logger";
import { DatabaseConfig } from "../config/DatabaseConfig";
import * as fs from "fs";

const sql = fs.readFileSync("init-database.sql").toString();

export class PostgreSQLConnector implements DatabaseConnector {
  private client: Pool;

  constructor(readonly config: DatabaseConfig) {
    this.client = new Pool({
      connectionString: config.connectionString,
    });
    this.client.on("error", (err) => {
      logger.info("Unexpected error on idle client", err);
    });
    this.client.on("connect", (client) => {
      logger.info("Database connected");
      client.query(sql, (err) => {
        if (err) {
          logger.error("Error initializing database", err);
        } else {
          logger.info("Database initialized");
        }
      });
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
