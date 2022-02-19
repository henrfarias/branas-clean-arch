import { OrderViewDTO } from "../../application/dto/orderView";
import { Order } from "../../domain/entity/order";
import { IFindOrderByCodeOutput, IOrderRepository } from "../../domain/repository/orderRepository";

export class OrderRepositoryMemory implements IOrderRepository {
  private orders: Order[]

  constructor() {
    this.orders = []
  }
  saveView(order: OrderViewDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findByCode(code: string): Promise<IFindOrderByCodeOutput> {
    throw new Error("Method not implemented.");
  }

  async save(order: Order): Promise<void> {
    this.orders.push(order)
  }

}
