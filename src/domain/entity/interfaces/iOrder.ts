import { Coupon } from "../coupon";
import { OrderItem } from "../orderItem";
import { Product } from "../product";

export interface IOrder {
  items: OrderItem[]
  description: string
  coupon?: Coupon
  issueDate: Date
}