import PlaceOrderInput from '../../src/checkout/application/dto/place-order-input'
import PlaceOrder from '../../src/checkout/application/usecases/place-order'
import DatabaseConnectionAdapter from '../../src/checkout/infra/database/database-connection-adapter'
import DatabaseRepositoryFactory from '../../src/checkout/infra/factory/DatabaseRepositoryFactory'

let placeOrder: PlaceOrder

beforeEach(function () {
  const connectionAdapter = new DatabaseConnectionAdapter()
  placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(connectionAdapter))
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
    'VALE20'
  )
  const output = await placeOrder.execute(input)

  expect(output.total).toBe(4872)
})
