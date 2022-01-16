import { IFreight, IInputFreight } from '../entity/interfaces/iFreight'

export class Freight {
  constructor(readonly freight: IFreight) {}

  static create(input: IInputFreight, distance: number): Freight {
    const { height, length, width, weight } = input
    const volume = (height * length * width) / Math.pow(100, 3)
    const density = Math.floor(weight / volume)
    const price = distance * volume * (density / 100)
    return new Freight({ distance, volume, density, price })
  }

  public getValue() {
    const price = this.freight.price
    return price
  }

  public apply() {
    const price = this.freight.price
    if (price < 10) return 10
    return price
  }
}
