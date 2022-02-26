import PlaceOrderInput from '../../src/checkout/application/dto/place-order-input'
import GetOrder from '../../src/checkout/application/query/get-order'
import PlaceOrder from '../../src/checkout/application/usecases/place-order'
import OrderDAODatabase from '../../src/checkout/infra/dao/order-dao-database'
import DatabaseConnectionAdapter from '../../src/checkout/infra/database/database-connection-adapter'
import DatabaseRepositoryFactory from '../../src/checkout/infra/factory/DatabaseRepositoryFactory'

let placeOrder: PlaceOrder
let getOrder: GetOrder
beforeEach(function () {
  const databaseConnection = new DatabaseConnectionAdapter()
  placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(databaseConnection))
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
  const getOrderOutput = await getOrder.execute(placeOrderOutput.code)
  expect(getOrderOutput.total).toBe(4872)
})
