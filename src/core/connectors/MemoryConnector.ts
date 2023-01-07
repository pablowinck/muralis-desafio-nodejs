import { DatabaseConnector } from "./DatabaseConnector";

export class MemoryConnector implements DatabaseConnector {
  private client: any;

  constructor() {
    this.client = new MemoryConnector();
  }

  async connect(): Promise<void> {
    this.client = new MemoryConnector();
  }

  async disconnect(): Promise<void> {
    await this.client.end();
  }

  async getClient(): Promise<any> {
    return await this.client.connect();
  }
}
