import { Coupon } from "../coupon";
import { OrderItem } from "../orderItem";
import { Product } from "../product";

export interface IOrder {
  description: string
  coupon?: Coupon
  issueDate: Date
}