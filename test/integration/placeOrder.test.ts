import { PlaceOrder } from '../../src/application/usecase/placeOrder'
import { DatabaseConnectionAdapter } from '../../src/infra/database/databaseConnectionAdapter'
import { ProductRepositoryDatabase } from '../../src/infra/repository/productRepositoryDatabase'
// import { ProductRepositoryMemory } from '../../src/infra/repository/productRepositoryMemory'

describe('Place order usecase', () => {
  const input = [
    {
      id: 1,
      quantity: 10,
    },
    {
      id: 2,
      quantity: 4,
    },
    {
      id: 3,
      quantity: 2,
    },
  ]

  test('Should place an order', async () => {
    const placeOrder = new PlaceOrder(
      new ProductRepositoryDatabase(new DatabaseConnectionAdapter())
    )
    const result = await placeOrder.execute('03889258093', input)
    expect(result.total).toBe(74.8)
  })
})
