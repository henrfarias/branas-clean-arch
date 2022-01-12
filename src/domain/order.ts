import { ICoupon } from '../interfaces/iCoupon'
import { IOrder } from '../interfaces/iOrder'
import { Coupon } from './coupon'
import { OrderItem } from './orderItem'
import { Product } from './product'

export class Order {
  coupon?: Coupon
  constructor(protected order: IOrder) {}

  static create(): Order {
    const order = new Order({ items: [], description: '' })
    return order
  }

  public get() {
    const order = this.order
    return order
  }

  public addProduct(item: Product, quantity: number): void {
    const { items } = this.order
    const { id, price } = item.get
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
    if (!this.isExpiredCoupon(coupon.expireIn)) throw new Error('Expired coupon')
    this.coupon = coupon
    return
  }

  public writeDescription(text: string) {
    this.order.description = text
    return
  }

  private isExpiredCoupon(date: Date): boolean {
    const diffDate = Date.now() - date.getTime()
    return diffDate < 0 ? true : false
  }
}
