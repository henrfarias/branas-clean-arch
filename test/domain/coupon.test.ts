import { Coupon } from '../../src/domain/coupon'

describe('Coupon class', () => {
  test('Should create a coupon', () => {
    const coupon = Coupon.create('BLACK20', 20)
    expect(coupon).toBeDefined()
  })

  test('Should throw an error to invalid coupon', () => {
    expect(() => Coupon.create('BLACK120', 120)).toThrow(
      new Error('Invalid coupon')
    )
  })
})
