import PlaceOrderInput from '../../src/application/dto/place-order-input'
import PlaceOrder from '../../src/application/usecases/place-order'
import DatabaseConnectionAdapter from '../../src/infra/database/database-connection-adapter'
import CouponRepositoryDatabase from '../../src/infra/repository/coupon-repository-database'
import ItemRepositoryDatabase from '../../src/infra/repository/item-repository-database'
import OrderRepositoryDatabase from '../../src/infra/repository/order-repository-database'

let placeOrder: PlaceOrder

beforeEach(function () {
  const connectionAdapter = new DatabaseConnectionAdapter()
  const itemRepository = new ItemRepositoryDatabase(connectionAdapter)
  const orderRepository = new OrderRepositoryDatabase(connectionAdapter)
  const couponRepository = new CouponRepositoryDatabase(connectionAdapter)
  placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository)
})

test('Deve fazer um pedido', async function () {
  const input = new PlaceOrderInput(
    '847.903.332-05',
    [
      {
        idItem: 1,
        quantity: 1,
      },
      {
        idItem: 2,
        quantity: 1,
      },
      {
        idItem: 3,
        quantity: 3,
      },
    ],
    new Date('2021-03-01'),
    2,
    'VALE20'
  )
  const output = await placeOrder.execute(input)

  expect(output.total).toBe(4872)
  expect(output.code).toBe('202100000002')
})
