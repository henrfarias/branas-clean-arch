import PlaceOrderInput from '../../src/checkout/application/dto/place-order-input'
import GetOrders from '../../src/checkout/application/query/get-orders'
import PlaceOrder from '../../src/checkout/application/usecases/place-order'
import OrderDAODatabase from '../../src/checkout/infra/dao/order-dao-database'
import DatabaseConnectionAdapter from '../../src/checkout/infra/database/database-connection-adapter'
import DatabaseRepositoryFactory from '../../src/checkout/infra/factory/DatabaseRepositoryFactory'

let placeOrder: PlaceOrder
let getOrders: GetOrders
beforeEach(function () {
  const databaseConnection = new DatabaseConnectionAdapter()
  placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(databaseConnection))
  const orderDAO = new OrderDAODatabase(databaseConnection)
  getOrders = new GetOrders(orderDAO)
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
  await placeOrder.execute(input)
  const getOrdersOutput = await getOrders.execute()
  expect(getOrdersOutput).toBeDefined()
})
