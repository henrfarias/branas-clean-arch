import { PlaceOrder } from '../../src/application/usecase/placeOrder'
import { DatabaseConnectionAdapter } from '../../src/infra/database/databaseConnectionAdapter'
import { CouponRepositoryDatabase } from '../../src/infra/repository/couponRepositoryDatabase'
import { OrderRepositoryDatabase } from '../../src/infra/repository/orderRepositoryDatabase'
import { ProductRepositoryDatabase } from '../../src/infra/repository/productRepositoryDatabase'

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
  const databaseConnection = new DatabaseConnectionAdapter()

  test('Should place an order', async () => {
    const spy = jest.spyOn(OrderRepositoryDatabase.prototype, 'save')
    const placeOrder = new PlaceOrder(
      new ProductRepositoryDatabase(databaseConnection),
      new OrderRepositoryDatabase(databaseConnection),
      new CouponRepositoryDatabase(databaseConnection)
    )
    const result = await placeOrder.execute('03889258093', input)
    expect(spy).toBeCalled()
    expect(result.total).toBe(74.8)
  })

  test('Should place an order', async () => {
    const spy = jest.spyOn(OrderRepositoryDatabase.prototype, 'save')
    const placeOrder = new PlaceOrder(
      new ProductRepositoryDatabase(databaseConnection),
      new OrderRepositoryDatabase(databaseConnection),
      new CouponRepositoryDatabase(databaseConnection)
    )
    const result = await placeOrder.execute('03889258093', input, 'VALE20')
    expect(spy).toBeCalled()
    expect(result.total).toBe(59.84)
  })

  test('Should throw a not found error', async () => {
    const placeOrder = new PlaceOrder(
      new ProductRepositoryDatabase(databaseConnection),
      new OrderRepositoryDatabase(databaseConnection),
      new CouponRepositoryDatabase(databaseConnection)
    )
    try {
      await placeOrder.execute('03889258093', [
        { id: 5, quantity: 1 },
      ])
    } catch (error) {
      expect(error).toStrictEqual(new Error('Product not found'))
    }
  })
})
