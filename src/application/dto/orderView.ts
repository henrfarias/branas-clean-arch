import { Cpf } from '../../domain/entity/cpf'
import { Order } from '../../domain/entity/order'
import { OrderItem } from '../../domain/entity/orderItem'

export class OrderViewDTO {
  code: string
  cpf: string
  issue_date: Date
  items: OrderItem[]
  coupon: string | undefined
  total: number
  
  constructor(order: Order) {
    this.code = order.code
    this.cpf = order.cpf.cpf
    this.issue_date = order.order.issueDate
    this.items = order.get().items
    this.coupon = order.getCoupon()
    this.total = order.getTotal()
  }
}
