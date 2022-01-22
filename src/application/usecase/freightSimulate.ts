import { IProductRepository } from '../../domain/repository/productRepository'
import { ISimulateFreightInput } from '../dto/simulateFreightInput'

export class FreightSimulate {
  freight: number

  constructor(readonly productRepository: IProductRepository) {
    this.freight = 0
  }

  public async simulate(input: ISimulateFreightInput[]) {
    for (const inputItem of input) {
      const foundItem = await this.productRepository.findById(inputItem.id)
      this.freight += foundItem.getFreight(1000)
    }
    return this.freight
  }
}
