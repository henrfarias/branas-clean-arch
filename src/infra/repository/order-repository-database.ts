import Order from '../../domain/entities/order'
import OrderRepository from '../../domain/repository/order-repository'
import DatabaseConnection from '../database/database-connection'

export default class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  async save(order: Order): Promise<void> {
    const [orderData] = await this.databaseConnection.query(
      'insert into template.orders (code, cpf, issue_date, freight, sequence, coupon) values ($1, $2, $3, $4, $5, $6) returning *',
      [order.code.value, order.getCpf(), order.issueDate, order.getFreight(), order.sequence, order.getCoupon()]
    )
    for (const orderItem of order.getOrderItems()) {
      await this.databaseConnection.query(`
        insert into template.order_items (
          id_order, id_item, price, quantity
        )
        values (
          $1, $2, $3, $4
        )
      `, [orderData.id, orderItem.idItem, orderItem.price, orderItem.quantity ])
    }
  }
}
