import { FreightSimulate } from "../../src/application/usecase/freightSimulate"
import { ProductRepositoryMemory } from "../../src/infra/repository/productRepositoryMemory"

describe('Freight simulate use case', () => {
  const input = [
    {
      id: 1,
      quantity: 1,
    },
    {
      id: 2,
      quantity: 1,
    },
    {
      id: 3,
      quantity: 1,
    },
  ]
  test('Should freight simulate from the input', async () => {
    const freightSimulator = new FreightSimulate(new ProductRepositoryMemory())
    const simulatedFreight = await freightSimulator.simulate(input)
    expect(simulatedFreight).toEqual(439.99) 
  })
})
