import { IDatabaseConnection } from '../../infra/database/databaseConnection'
import { IGetOrderOutput } from '../dto/getOrderOutput'

export class GetOrder {
  constructor(readonly databaseConnection: IDatabaseConnection) {}

  async execute(code: string): Promise<IGetOrderOutput> {
    const [orderData] = await this.databaseConnection.query(
      'select data from project.order_view where code = $1',
      [code]
    )
    return orderData
  }
}
