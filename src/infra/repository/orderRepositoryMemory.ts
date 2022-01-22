import { Order } from "../../domain/entity/order";
import { IOrderRepository } from "../../domain/repository/orderRepository";

export class OrderRepositoryMemory implements IOrderRepository {
  private orders: Order[]

  constructor() {
    this.orders = []
  }

  async save(order: Order): Promise<void> {
    this.orders.push(order)
  }

}
