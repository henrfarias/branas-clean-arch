import OrderDAO from '../../application/query/order-dao'
import OrderDTO from '../../application/query/order-dto'
import OrderItemDTO from '../../application/query/order-item-dto'
import DatabaseConnection from '../database/database-connection'

export default class OrderDAODatabase implements OrderDAO {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  async getOrders(): Promise<OrderDTO[]> {
    const orderData = await this.databaseConnection.query(
      'select id, code, cpf, freight::float, total::float from template.orders',
      []
    )
    return orderData
  }

  async getOrder(code: string): Promise<OrderDTO> {
    const [orderData] = await this.databaseConnection.query(
      'select id, code, cpf, freight::float, total::float from template.orders where code = $1',
      [code]
    )
    return orderData
  }
  async getOrderItems(idOrder: number): Promise<OrderItemDTO[]> {
    const orderItemsData = await this.databaseConnection.query(
      'select i.description, oi.quantity::float, oi.price::float from template.order_items oi join template.items i on (oi.id_item = i.id) where id_order = $1',
      [idOrder]
    )
    return orderItemsData
  }
}
