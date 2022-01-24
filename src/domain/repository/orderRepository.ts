import { Order } from "../entity/order";

export interface IFindOrderByCodeOutput {
  order: Order
  couponCode: string
}

export interface IOrderRepository {
  save(order: Order): Promise<void>
  findByCode(code: string): Promise<IFindOrderByCodeOutput>
}