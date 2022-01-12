import { Coupon } from '../../src/domain/coupon'
import { Order } from '../../src/domain/order'
import { Product } from '../../src/domain/product'
import { IOrder } from '../../src/interfaces/iOrder'

describe('Order class', () => {
  const prod1 = Product.create({
    id: 1,
    name: 'lápis',
    price: 2,
    description: 'Faber-castell',
  })
  const prod2 = Product.create({
    id: 2,
    name: 'caneta',
    price: 3.7,
    description: 'Pilot',
  })
  const prod3 = Product.create({
    id: 3,
    name: 'caderno',
    price: 20,
    description: 'Tilibra',
  })

  test('should return a order entity with three products', () => {
    const order = Order.create()
    order.addProduct(prod1, 10)
    order.addProduct(prod2, 4)
    order.addProduct(prod3, 2)
    expect(order.getTotal()).toStrictEqual(74.8)
  })

  test('should receive a descount coupon in a exists order', () => {
    const order = Order.create()
    order.addProduct(prod1, 10)
    order.addProduct(prod2, 4)
    order.addProduct(prod3, 2)
    order.addCoupon(Coupon.create('BLACKFRIDAY', 50))
    expect(order.getTotal()).toBe(37.4)
  })
  test('should write a description on an exists order', () => {
    const order = Order.create()
    order.writeDescription('bought in black friday')
    expect(order.get()).toStrictEqual({
      items: [],
      description: 'bought in black friday',
    } as IOrder)
  })
})
