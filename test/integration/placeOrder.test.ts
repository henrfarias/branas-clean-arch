import { PlaceOrder } from '../../src/application/usecase/placeOrder'
import { DatabaseConnectionAdapter } from '../../src/infra/database/databaseConnectionAdapter'
import { OrderRepositoryMemory } from '../../src/infra/repository/orderRepositoryMemory'
import { ProductRepositoryDatabase } from '../../src/infra/repository/productRepositoryDatabase'
import { ProductRepositoryMemory } from '../../src/infra/repository/productRepositoryMemory'

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
    const spy = jest.spyOn(OrderRepositoryMemory.prototype, 'save')
    const placeOrder = new PlaceOrder(new ProductRepositoryMemory(), new OrderRepositoryMemory())
    const result = await placeOrder.execute('03889258093', input)
    expect(spy).toBeCalled()
    expect(result.total).toBe(74.8)
  })

  test('Should throw a not found error', async () => {
    const placeOrder = new PlaceOrder(new ProductRepositoryMemory(), new OrderRepositoryMemory())
    try {
      const result = await placeOrder.execute('03889258093', [
        { id: 5, quantity: 1 },
      ])
    } catch (error) {
      expect(error).toStrictEqual(new Error('Product not found'))
    }
  })
})
