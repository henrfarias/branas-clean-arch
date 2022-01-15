import Order from "../../domain/entities/order";
import OrderRepository from "../../domain/repository/order-repository";

export default class OrderRepositoryMemory implements OrderRepository {
  order: Order[];
  constructor () {
    this.order = []
  }

  save(order: Order): void {
    this.order.push(order)
  }
}