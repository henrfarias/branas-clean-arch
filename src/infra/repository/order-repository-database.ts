import Order from '../../domain/entities/order'
import OrderRepository from '../../domain/repository/order-repository'
import DatabaseConnection from '../database/database-connection'

export default class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  async save(order: Order): Promise<void> {
    const [orderData] = await this.databaseConnection.query(
      'insert into template.orders (code, cpf, issue_date, freight, sequence, coupon, total) values ($1, $2, $3, $4, $5, $6, $7) returning *',
      [
        order.code.value,
        order.getCpf(),
        order.issueDate,
        order.getFreight(),
        order.sequence,
        order.getCoupon(),
        order.getTotal(),
      ]
    )
    for (const orderItem of order.getOrderItems()) {
      await this.databaseConnection.query(
        `
        insert into template.order_items (
          id_order, id_item, price, quantity
        )
        values (
          $1, $2, $3, $4
        )
      `,
        [orderData.id, orderItem.idItem, orderItem.price, orderItem.quantity]
      )
    }
    await this.databaseConnection.query(
      'insert into template.order_view (code, data) values ($1, $2)',
      [orderData.code, order]
    )
  }

  async count(): Promise<number> {
    const [data] = await this.databaseConnection.query(
      'select count(*)::int from template.orders',
      []
    )
    return data.count
  }
}
