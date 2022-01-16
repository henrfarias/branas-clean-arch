import { IProduct } from "../entity/interfaces/iProduct"

export class Product {
  constructor(protected product: IProduct) {}

  static create(prod: IProduct) {
    const product = new Product(prod)
    return product
  }

  public getProduct() {
    const product = this.product
    return product
  }
  
  public getId() {
    const productId = this.product.id
    return productId
  }
}