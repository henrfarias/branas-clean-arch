import { IOrder, Status } from '../interfaces/iOrder'
import { Product } from './product'

export class Order {
  constructor(protected order: IOrder) {}

  public get get() {
    const order = this.order
    return order
  } 

  public applyDiscount(rate: number) {
    this.order.discount = rate
    if (rate >= 1) {
      throw new Error('Invalid discount')
    }
    this.order.total = this.order.amount * (1 - rate)
    return
  }

  public writeDescription(text: string) {
    this.order.description = text
    return
  }

  static create(products: Product[]): Order {
    if (!products.length) {
      throw new Error('The order must have least one product')
    }

    const order: IOrder = {
      products,
      amount: 0,
      quantity: 0,
      description: '',
      status: Status.PENDING,
      discount: 0,
      total: 0
    }
    for (let product of products) {
      const { price, quantity } = product.get
      order.amount += price * quantity
      order.quantity += quantity
    }
    order.total = order.amount
    return new Order(order)
  }

  public execute(): Status {
    this.order.status = Status.SUCCESS
    return Status.SUCCESS
  }
}
