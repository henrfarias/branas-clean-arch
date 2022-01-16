export interface DatabaseConnection {
  query(statement: string, props: any): Promise<any>
}