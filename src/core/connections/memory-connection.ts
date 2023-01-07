import { DatabaseConnection } from "./database-connection";

export class MemoryConnection implements DatabaseConnection {
  close(): Promise<void> {
    return Promise.resolve(undefined);
  }

  query(query: string, params?: any[]): Promise<any> {
    return Promise.resolve(undefined);
  }
}
