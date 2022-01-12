import { Coupon } from "../domain/coupon";
import { OrderItem } from "../domain/orderItem";
import { Product } from "../domain/product";

export interface IOrder {
  items: OrderItem[]
  description: string
  coupon?: Coupon
}