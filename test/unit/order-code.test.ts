import OrderCode from "../../src/checkout/domain/entities/order-code"

test('Deve criar o código de um pedido', function () {
  const date = new Date('2021-03-01')
  const sequence = 1
  const code = new OrderCode(date, sequence)
  expect(code.value).toBe('202100000001')
})