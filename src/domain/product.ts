import { IProduct } from "../interfaces/iProduct"

export class Product {
  constructor(protected product: IProduct) {}

  get get() {
    const product = this.product
    return product
  }
  static create(prod: IProduct) {
    const product = new Product(prod)
    return product
  }
}