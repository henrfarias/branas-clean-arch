import { Product } from "../domain/product";

export enum Status {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed'
} 

export interface IOrder {
  products: Product[]
  amount: number
  quantity: number
  description: string
  discount?: number
  status: Status
  total: number
}