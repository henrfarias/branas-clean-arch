import { IProduct } from "../entity/interfaces/iProduct"

export class Product {
  constructor(private product: IProduct) {}

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

  public getFreight(distance: number) {
    const { height = 0, length = 0, width = 0, weight = 0 } = this.product
    const volume = (height * length * width) / Math.pow(100, 3)
    const density = Math.floor(weight / volume)
    const price = distance * volume * (density / 100)
    return price
  }
}