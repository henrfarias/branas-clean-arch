import { Product } from "./product"

export class Freight {
  private price: number

  constructor(readonly distance: number = 1000) {
    this.price = 0
  }

  static create(distance?: number): Freight {
    return new Freight(distance)
  }

  public getValue() {
    const price = this.price
    return price
  }

  public addFreight(product: Product, quantity: number) {
    this.price += (product.getFreight(this.distance) * quantity)
  }

  public apply() {
    const price = this.price
    if (price < 10) return 10
    return price
  }
}
