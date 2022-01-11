import Coupon from '../src/coupon'
import Item from '../src/item'
import Order from '../src/order'

test('Não deve criar um pedido com cpf inválido', function () {
  expect(() => new Order('111.111.111-11')).toThrow(new Error('Invalid cpf'))
})

test('Deve criar um pedido com cpf inválido', function () {
  const order = new Order('038.892.580-93')
  expect(order).toBeDefined()
})

test('Deve criar um pedido com 3 itens', function () {
  const order = new Order('038.892.580-93')
  order.addItem(new Item(1, 'Instrumentos Musicais', 'Guitarra', 1000), 1)
  order.addItem(new Item(2, 'Instrumentos Musicais', 'Amplificador', 5000), 1)
  order.addItem(new Item(3, 'Instrumentos Musicais', 'Cabo', 30), 3)
  const total = order.getTotal()
  expect(total).toBe(6090)
})

test('Deve criar um pedido com 3 itens com cupom de desconto', function () {
  const order = new Order('038.892.580-93')
  order.addItem(new Item(1, 'Instrumentos Musicais', 'Guitarra', 1000), 1)
  order.addItem(new Item(2, 'Instrumentos Musicais', 'Amplificador', 5000), 1)
  order.addItem(new Item(3, 'Instrumentos Musicais', 'Cabo', 30), 3)
  order.addCoupon(new Coupon('VALE20', 20))
  const total = order.getTotal()
  expect(total).toBe(4872)
})
