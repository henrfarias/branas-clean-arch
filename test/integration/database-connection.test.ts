import DatabaseConnectionAdapter from "../../src/checkout/infra/database/database-connection-adapter"

test.skip('Deve criar uma conexão com o banco de dados', async function () {
  const databaseConnection = new DatabaseConnectionAdapter()
  const items = await databaseConnection.query('select * from public.items', [])
  expect(items).toHaveLength(3)
})