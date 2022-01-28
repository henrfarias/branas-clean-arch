import { ICoupon } from '../entity/interfaces/iCoupon'
import { IOrder } from '../entity/interfaces/iOrder'
import { OrderCode } from './orderCode'
import { Coupon } from './coupon'
import { Cpf } from './cpf'
import { Freight } from './freight'
import { OrderItem } from './orderItem'
import { Product } from './product'

export class Order {
  private coupon?: Coupon
  private items: OrderItem[]
  private freight: Freight
  readonly code: string

  constructor(readonly cpf: Cpf, readonly order: IOrder) {
    this.items = []
    this.code = new OrderCode(order.issueDate).getValue()
    this.freight = new Freight()
  }

  static create(cpf: Cpf, issueDate: Date = new Date()): Order {
    const order = new Order(cpf, { description: '', issueDate })
    return order
  }

  public get() {
    const order = {
      ...this.order,
      items: this.items,
      code: this.code,
      freight: this.freight,
    }
    return order
  }

  public addProduct(item: Product, quantity: number): void {
    const { id, price } = item.getProduct()
    this.freight.addFreight(item, quantity)
    this.items.push(new OrderItem({ id, price, quantity }))
  }

  public getTotal() {
    let total = 0
    for (const orderItem of this.items) {
      const item = orderItem.get()
      total += item.price * item.quantity
    }
    if (this.coupon) total = +(total - total * this.coupon.percentage).toFixed(2)
    return total
  }

  public addCoupon(coupon: Coupon): void {
    if (coupon.isExpire(this.order.issueDate)) throw new Error('Expired coupon')
    this.coupon = coupon
    return
  }

  public writeDescription(text: string) {
    this.order.description = text
    return
  }

  public getCoupon() {
    const code = this.coupon?.code
    return code
  }
}
