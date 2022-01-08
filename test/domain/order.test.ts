import { Order } from '../../src/domain/order'
import { Product } from '../../src/domain/product'
import { IOrder, Status } from '../../src/interfaces/iOrder'

describe('Order class', () => {
  const products: Product[] = [
    Product.create({
      name: 'lápis',
      price: 2,
      quantity: 10,
      description: 'Faber-castell',
    }),
    Product.create({
      name: 'caneta',
      price: 3.7,
      quantity: 4,
      description: 'Pilot',
    }),
    Product.create({
      name: 'caderno',
      price: 20,
      quantity: 2,
      description: 'Tilibra',
    }),
  ]

  test('should return a order entity with at least three products', () => {
    const order = Order.create(products)
    expect(order.get).toStrictEqual({
      products,
      amount: 74.8,
      quantity: 16,
      description: '',
      discount: 0,
      status: Status.PENDING,
      total: 74.8,
    } as IOrder)
  })

  test('should return an error if order be created without products', () => {
    const products: Product[] = []
    expect(() => Order.create(products)).toThrow(
      'The order must have least one product'
    )
  })

  test('should receive a descount coupon in a exists order', () => {
    const order = Order.create(products)
    order.applyDiscount(0.5)
    expect(order.get).toStrictEqual({
      products,
      amount: 74.8,
      quantity: 16,
      description: '',
      discount: 0.5,
      status: Status.PENDING,
      total: 37.4,
    } as IOrder)
  })
  test('should not accept a descount coupon greater than 0.99 (99%)', () => {
    const order = Order.create(products)
    expect(() => order.applyDiscount(1.2)).toThrow('Invalid discount')
  })

  test('should execute a order and change this status to success', () => {
    const order = Order.create(products)
    expect(order.execute()).toBe(Status.SUCCESS)
  })
})
