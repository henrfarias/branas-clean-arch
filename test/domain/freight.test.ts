import { Freight } from '../../src/domain/entity/freight'
import { IInputFreight } from '../../src/domain/entity/interfaces/iFreight'

describe('Freight class', () => {
  const dimensions: IInputFreight[] = [
    { length: 20, height: 15, width: 10, weight: 1 },
    { length: 100, height: 30, width: 10, weight: 3 },
    { length: 200, height: 100, width: 50, weight: 40 },
  ]
  test('Must calculate the value of freight based on the dimensions and weight of the products', () => {
    const expected = [9.99, 30, 400]
    for (let i = 0; i < 3; i++) {
      const freight = Freight.create(dimensions[i], 1000)
      expect(freight.getValue()).toBe(expected[i])
    }
  })
  test('Must return min value of freight if this greatest than calculed value', () => {
    const expected = [10, 30, 400]
    for (let i = 0; i < 3; i++) {
      const freight = Freight.create(dimensions[i], 1000)
      expect(freight.apply()).toBe(expected[i])
    }
  })
})
