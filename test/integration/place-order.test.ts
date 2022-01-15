import PlaceOrder from "../../src/application/usecases/place-order"
import DatabaseConnectionAdapter from "../../src/infra/database/database-connection-adapter"
import ItemRepositoryDatabase from "../../src/infra/repository/item-repository-database"
import OrderRepositoryMemory from "../../src/infra/repository/order-repository-memory"

test('Deve fazer um pedido', async function () {
  const input = {
    cpf: '038.892.580-93',
    orderItems: [
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
  }
  const placOrder = new PlaceOrder(
    new ItemRepositoryDatabase(new DatabaseConnectionAdapter()),
    new OrderRepositoryMemory()
  )
  const output = await placOrder.execute(input)

  expect(output.total).toBe(6090)
})
