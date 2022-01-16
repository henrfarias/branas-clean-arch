import { Coupon } from '../../src/domain/entity/coupon'

describe('Coupon class', () => {
  test('Should create a coupon', () => {
    const coupon = Coupon.create(
      'BLACK20',
      20,
      new Date('2022-01-16T00:00:00.000Z')
    )
    expect(coupon).toBeDefined()
  })

  test('Should throw an error to invalid coupon', () => {
    expect(() => Coupon.create('BLACK120', 120)).toThrow(
      new Error('Invalid coupon')
    )
  })

  test('Should throw an error to invalid coupon', () => {
    const coupon = Coupon.create('BLACK20', 20, new Date('2021-10-10'))
    expect(coupon.isExpire()).toBeTruthy()
  })
})
