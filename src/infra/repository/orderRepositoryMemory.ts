import { Order } from "../../domain/entity/order";
import { IOrderRepository } from "../../domain/repository/orderRepository";

export class OrderRepositoryMemory implements IOrderRepository {
  private orders: Order[]

  constructor() {
    this.orders = []
  }

  save(order: Order): void {
    this.orders.push(order)
  }

}
