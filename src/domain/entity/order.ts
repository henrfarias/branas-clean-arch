import { ICoupon } from '../entity/interfaces/iCoupon'
import { IOrder } from '../entity/interfaces/iOrder'
import { Coupon } from './coupon'
import { Cpf } from './cpf'
import { Freight } from './freight'
import { OrderItem } from './orderItem'
import { Product } from './product'

export class Order {
  private coupon?: Coupon
  private items: OrderItem[]
  private freight: Freight

  constructor(readonly cpf: Cpf, protected order: IOrder) {
    this.items = []
    this.freight = new Freight()
  }

  static create(cpf: Cpf, dueDate: Date = new Date()): Order {
    const order = new Order(cpf, { description: '', issueDate: dueDate })
    return order
  }

  public get() {
    const order = { ...this.order, items: this.items }
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
    if (this.coupon) total = total - total * this.coupon.percentage
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
}
