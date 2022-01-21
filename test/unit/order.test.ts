import Coupon from "../../src/domain/entities/coupon"
import Item from "../../src/domain/entities/item"
import Order from "../../src/domain/entities/order"

test('Não deve criar um pedido com cpf inválido', function () {
  expect(() => new Order('111.111.111-11')).toThrow(new Error('Invalid cpf'))
})

test('Deve criar um pedido com cpf inválido', function () {
  const order = new Order('800.493.940-61')
  expect(order).toBeDefined()
})

test('Deve criar um pedido com 3 itens', function () {
  const order = new Order('800.493.940-61')
  order.addItem(new Item(1, 'Instrumentos Musicais', 'Guitarra', 1000), 1)
  order.addItem(new Item(2, 'Instrumentos Musicais', 'Amplificador', 5000), 1)
  order.addItem(new Item(3, 'Instrumentos Musicais', 'Cabo', 30), 3)
  const total = order.getTotal()
  expect(total).toBe(6090)
})

test('Deve criar um pedido com 3 itens com cupom de desconto', function () {
  const order = new Order('800.493.940-61')
  order.addItem(new Item(1, 'Instrumentos Musicais', 'Guitarra', 1000), 1)
  order.addItem(new Item(2, 'Instrumentos Musicais', 'Amplificador', 5000), 1)
  order.addItem(new Item(3, 'Instrumentos Musicais', 'Cabo', 30), 3)
  order.addCoupon(new Coupon('VALE20', 20))
  const total = order.getTotal()
  expect(total).toBe(4872)
})

test('Deve criar um pedido com 3 itens com cupom de desconto expirado', function () {
  const order = new Order('800.493.940-61', new Date('2021-03-02'))
  order.addItem(new Item(1, 'Instrumentos Musicais', 'Guitarra', 1000), 1)
  order.addItem(new Item(2, 'Instrumentos Musicais', 'Amplificador', 5000), 1)
  order.addItem(new Item(3, 'Instrumentos Musicais', 'Cabo', 30), 3)
  order.addCoupon(new Coupon('VALE20', 20, new Date('2021-03-01')))
  const total = order.getTotal()
  expect(total).toBe(6090)
})

test('Deve criar um pedido com 3 itens', function () {
  const order = new Order('800.493.940-61')
  order.addItem(new Item(1, 'Instrumentos Musicais', 'Guitarra', 1000, 100, 30 , 10, 3), 1)
  order.addItem(new Item(2, 'Instrumentos Musicais', 'Amplificador', 5000, 100, 50, 50, 20), 1)
  order.addItem(new Item(3, 'Instrumentos Musicais', 'Cabo', 30, 10, 10, 10, 0.9), 3)
  const freight = order.getFreight()
  expect(freight).toBe(260)
})

test('Deve criar um pedido com código gerado', function () {
  const order = new Order('800.493.940-61', new Date('2021-03-01'), 2)
  const code = order.code
  expect(code.value).toBe('202100000002')
})