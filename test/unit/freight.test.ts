import { Freight } from '../../src/domain/entity/freight'
import { Product } from '../../src/domain/entity/product'

describe('Freight class', () => {
  const products = [
    Product.create({
      id: 1,
      name: 'lápis',
      price: 2,
      description: 'Faber-castell',
      length: 20,
      height: 15,
      width: 10,
      weight: 1,
    }),
    Product.create({
      id: 2,
      name: 'caneta',
      price: 3.7,
      description: 'Pilot',
      length: 100,
      height: 30,
      width: 10,
      weight: 3,
    }),
    Product.create({
      id: 3,
      name: 'caderno',
      price: 20,
      description: 'Tilibra',
      length: 200,
      height: 100,
      width: 50,
      weight: 40,
    }),
  ]

  test('Must calculate the value of freight based on the dimensions and weight of the products', () => {
    const expected = [9.99, 30, 400]
    for (let i = 0; i < 3; i++) {
      const freight = Freight.create()
      freight.addFreight(products[i], 1)
      expect(freight.getValue()).toBe(expected[i])
    }
  })
  test('Must return min value of freight if this greatest than calculed value', () => {
    const expected = [10, 30, 400]
    for (let i = 0; i < 3; i++) {
      const freight = Freight.create()
      freight.addFreight(products[i], 1)
      expect(freight.apply()).toBe(expected[i])
    }
  })
})
