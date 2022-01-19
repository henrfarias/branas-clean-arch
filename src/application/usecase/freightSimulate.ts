import { Product } from '../../domain/entity/product'
import { IProductRepository } from '../../domain/repository/productRepository'
import { IOrderItemInput } from '../dto/orderItemInput'

export class FreightSimulate {
  freight: number

  constructor(readonly productRepository: IProductRepository) {
    this.freight = 0
  }

  public async simulate(input: IOrderItemInput[]) {
    for (const inputItem of input) {
      const foundItem = await this.productRepository.findById(inputItem.id)
      this.freight += foundItem.getFreight(1000)
    }
    return this.freight
  }
}
