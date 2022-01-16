import { Order } from "../entity/order";

export interface IOrderRepository {
  save(order: Order): void
}