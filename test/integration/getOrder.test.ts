import { GetOrder } from '../../src/application/query/getOrder'
import { PlaceOrder } from '../../src/application/usecase/placeOrder'
import { Cpf } from '../../src/domain/entity/cpf'
import { Order } from '../../src/domain/entity/order'
import { DatabaseConnectionAdapter } from '../../src/infra/database/databaseConnectionAdapter'
import { CouponRepositoryDatabase } from '../../src/infra/repository/couponRepositoryDatabase'
import { OrderRepositoryDatabase } from '../../src/infra/repository/orderRepositoryDatabase'
import { ProductRepositoryDatabase } from '../../src/infra/repository/productRepositoryDatabase'

describe('Get order use case', () => {
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
  test('Should get order from database by code', async () => {
    const placeOrder = new PlaceOrder(
      new ProductRepositoryDatabase(databaseConnection),
      new OrderRepositoryDatabase(databaseConnection),
      new CouponRepositoryDatabase(databaseConnection)
    )
    const order = await placeOrder.execute('798.353.070-67', input)
    const getOrder = new GetOrder(databaseConnection)
    const orderData = await getOrder.execute(order.code)
    expect(orderData).toHaveProperty('cpf')
  })
})
