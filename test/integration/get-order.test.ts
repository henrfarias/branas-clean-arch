import PlaceOrderInput from '../../src/application/dto/place-order-input'
import GetOrder from '../../src/application/query/get-order'
import PlaceOrder from '../../src/application/usecases/place-order'
import OrderDAODatabase from '../../src/infra/dao/order-dao-database'
import DatabaseConnectionAdapter from '../../src/infra/database/database-connection-adapter'
import CouponRepositoryDatabase from '../../src/infra/repository/coupon-repository-database'
import ItemRepositoryDatabase from '../../src/infra/repository/item-repository-database'
import OrderRepositoryDatabase from '../../src/infra/repository/order-repository-database'

let placeOrder: PlaceOrder
let getOrder: GetOrder
beforeEach(function () {
  const databaseConnection = new DatabaseConnectionAdapter()
  const itemRepository = new ItemRepositoryDatabase(databaseConnection)
  const orderRepository = new OrderRepositoryDatabase(databaseConnection)
  const couponRepository = new CouponRepositoryDatabase(databaseConnection)
  placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository)
  const orderDAO = new OrderDAODatabase(databaseConnection)
  getOrder = new GetOrder(orderDAO)
})

test('Deve obter um pedido pelo codigo', async function () {
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
    'VALE20'
  )
  const placeOrderOutput = await placeOrder.execute(input)
  const getOrderOutput =  await getOrder.execute(placeOrderOutput.code)
  console.log(getOrderOutput)
  expect(getOrderOutput.total).toBe(4872)
})
