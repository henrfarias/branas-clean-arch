import { Order } from '../../domain/entity/order'
import { IOrderRepository } from '../../domain/repository/orderRepository'
import { IDatabaseConnection } from '../database/databaseConnection'

export class OrderRepositoryDatabase implements IOrderRepository {
  constructor(readonly databaseConnection: IDatabaseConnection) {}

  async save(order: Order): Promise<void> {
    const { code, coupon, description, freight, issueDate, items } = order.get()
    const [orderData] = await this.databaseConnection.query(
      `insert into project.orders (
        code, cpf, issue_date, freight, description, coupon 
      )
      values (
        $1, $2, $3, $4, $5, $6
      ) returning *`,
      [
        code,
        order.cpf.cpf,
        issueDate,
        freight.getValue(),
        description,
        order.getCoupon(),
      ]
    )
    for (const item of items) {
      const {id: idItem, price, quantity} = item.get()
      await this.databaseConnection.query(`insert into project.order_items (
        id_order, id_item, price, quantity
      )
      values (
        $1, $2, $3, $4
      );`, [orderData.id, idItem, price, quantity])
    }
  }
}
