import { DatabaseConnection } from "./database-connection";
import * as fs from "fs";
import pgp from "pg-promise";

const sql = fs.readFileSync("init-database.sql").toString();

export class PgConnection implements DatabaseConnection {
  pgp: any;

  constructor() {
    this.pgp = pgp()(process.env.DATABASE_URL || "");
  }

  async close(): Promise<void> {
    this.pgp.close();
  }

  async query(query: string, params?: any[]): Promise<any> {
    return this.pgp.query(query, params);
  }
}
