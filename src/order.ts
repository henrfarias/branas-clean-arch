import Coupon from './coupon'
import Cpf from './cpf'
import Item from './item'
import OrderItem from './order-item'

export default class Order {
  private cpf: Cpf
  private coupon: Coupon | undefined
  private orderItems: OrderItem[]
  private freight: number

  constructor(cpf: string, readonly issueDate: Date = new Date()) {
    this.cpf = new Cpf(cpf)
    this.orderItems = []
    this.freight = 0
  }

  addItem(item: Item, quantity: number) {
    this.freight += item.getFreight() * quantity
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity))
  }

  addCoupon(coupon: Coupon) {
    if (coupon.isExpired(this.issueDate)) return
    this.coupon = coupon
  }

  getTotal() {
    let total = 0
    for (const orderItem of this.orderItems) {
      total += orderItem.getTotal()
    }
    if (this.coupon) {
      total -= (total * this.coupon.percentage) / 100
    }
    return total
  }

  getFreight() {
    return this.freight
  }
}
