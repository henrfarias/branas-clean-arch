import DatabaseConnection from "./database-connection";
import pgp from 'pg-promise'

export default class DatabaseConnectionAdapter implements DatabaseConnection {
  pgp: any

  constructor () {
    this.pgp = pgp()('postgres://henrfarias:docker@localhost:5432/branas')
  }

  async query(statement: string, params: any) {
    const result = await this.pgp.query(statement, params) 
    return result
  }
}