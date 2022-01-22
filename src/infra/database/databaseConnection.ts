export interface IDatabaseConnection {
  query(statement: string, props: any): Promise<any>
}