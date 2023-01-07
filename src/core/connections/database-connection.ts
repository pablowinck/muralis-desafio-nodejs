// interface for the database connector

export interface DatabaseConnection {
  close(): Promise<void>;
  query<T>(query: string, params?: any[]): Promise<T>;
}
