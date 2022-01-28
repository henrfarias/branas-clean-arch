import { OrderViewDTO } from "../../application/dto/orderView";
import { Order } from "../entity/order";

export interface IFindOrderByCodeOutput {
  order: Order
  couponCode: string
}

export interface IOrderRepository {
  saveView(order: OrderViewDTO): Promise<void>
  save(order: Order): Promise<void>
  findByCode(code: string): Promise<IFindOrderByCodeOutput>
}