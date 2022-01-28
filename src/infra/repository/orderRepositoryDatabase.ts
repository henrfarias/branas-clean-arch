import { OrderViewDTO } from '../../application/dto/orderView'
import { Cpf } from '../../domain/entity/cpf'
import { Order } from '../../domain/entity/order'
import {
  IFindOrderByCodeOutput,
  IOrderRepository,
} from '../../domain/repository/orderRepository'
import { IDatabaseConnection } from '../database/databaseConnection'

interface IOrderData {
  id: number
  coupon?: string
  code: string
  cpf: string
  issue_date: Date
  freight: number
  description: string
}

interface IOrderItemData {
  id_order: number
  id_item: number
  price: number
  quantity: number
}

export class OrderRepositoryDatabase implements IOrderRepository {
  constructor(readonly databaseConnection: IDatabaseConnection) {}
  async saveView(data: OrderViewDTO): Promise<void> {
    await this.databaseConnection.query(
      'insert into project.order_view (code, data) values ($1, $2)',
      [data.code, data]
    )
  }

  async save(order: Order): Promise<void> {
    const { code, description, freight, issueDate, items } = order.get()
    const [orderData]: IOrderData[] = await this.databaseConnection.query(
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
      const { id: idItem, price, quantity } = item.get()
      await this.databaseConnection.query(
        `insert into project.order_items (
        id_order, id_item, price, quantity
      )
      values (
        $1, $2, $3, $4
      );`,
        [orderData.id, idItem, price, quantity]
      )
    }
  }

  async findByCode(code: string): Promise<IFindOrderByCodeOutput> {
    const [orderData]: IOrderData[] = await this.databaseConnection.query(
      'select * from project.orders where code=$1',
      [code]
    )
    const order = new Order(new Cpf(orderData.cpf), {
      description: orderData.description,
      issueDate: orderData.issue_date,
    })
    const couponCode = orderData.coupon ? orderData.coupon : ''
    const orderItems: IOrderItemData[] = await this.databaseConnection.query(
      'select * from project.order_items where order_id=$1',
      [orderData.id]
    )
    return { order, couponCode }
  }
}
