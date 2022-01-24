import { GetOrder } from '../../src/application/usecase/getOrder'
import { DatabaseConnectionAdapter } from '../../src/infra/database/databaseConnectionAdapter'
import { OrderRepositoryDatabase } from '../../src/infra/repository/orderRepositoryDatabase'

describe('Get order use case', () => {
  const databaseConnection = new DatabaseConnectionAdapter()
  const orderRepository = new OrderRepositoryDatabase(databaseConnection)
  test('Should get order from database by code', async () => {
    const getOrder = new GetOrder(orderRepository)
    const code = '2022MMCXNVUF'
    const order = await getOrder.execute(code)
    expect(order.get().code).toBe(code)
  })
})
