// interface for the database connector
import { PoolClient } from "pg";

export interface DatabaseConnector {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  getClient: () => Promise<PoolClient>;
}
