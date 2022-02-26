import { IDatabaseConnection } from "./databaseConnection";
import pgp from 'pg-promise'

export class DatabaseConnectionAdapter implements IDatabaseConnection {
  pgp: any

  constructor() {
    this.pgp = pgp()('postgres://henrfarias:docker@localhost:5432/branas')
  }

  async query(statement: string, props: any): Promise<any> {
    return await this.pgp.query(statement, props)
  }
}