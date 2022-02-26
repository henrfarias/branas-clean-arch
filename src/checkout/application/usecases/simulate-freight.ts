import ItemRepository from '../../domain/repository/item-repository'
import SimulateFreightInput from '../dto/simulate-freight-input'

export default class SimulateFreight {
  constructor(readonly itemRepository: ItemRepository) {}

  async execute(input: SimulateFreightInput): Promise<number> {
    let freight = 0
    for (const itemInput of input.items) {
      const item = await this.itemRepository.findById(itemInput.idItem)
      freight += item.getFreight() * itemInput.quantity
    }
    return freight
  }
}
