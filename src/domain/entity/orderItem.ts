import { IOrderItem } from '../entity/interfaces/iOrderItem'

export class OrderItem {
  constructor(private orderItem: IOrderItem) {}

  public get() {
    const orderItem = this.orderItem
    return orderItem
  }
}
