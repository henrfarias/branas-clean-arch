import { ICoupon } from '../entity/interfaces/iCoupon'
import { IOrder } from '../entity/interfaces/iOrder'
import { Coupon } from './coupon'
import { Cpf } from './cpf'
import { OrderItem } from './orderItem'
import { Product } from './product'

export class Order {
  private coupon?: Coupon

  constructor(readonly cpf: Cpf, protected order: IOrder) {}

  static create(cpf: Cpf, dueDate: Date = new Date()): Order {
    const order = new Order(cpf, { items: [], description: '', issueDate: dueDate })
    return order
  }

  public get() {
    const order = this.order
    return order
  }

  public addProduct(item: Product, quantity: number): void {
    const { items } = this.order
    const { id, price } = item.getProduct()
    items.push(new OrderItem({ id, price, quantity }))
  }

  public getTotal() {
    const { items } = this.order
    let total = 0
    for (const orderItem of items) {
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
