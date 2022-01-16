import { IOrderItem } from '../entity/interfaces/iOrderItem'

export class OrderItem {
  constructor(readonly orderItem: IOrderItem) {}

  public get() {
    const orderItem = this.orderItem
    return orderItem
  }
}
