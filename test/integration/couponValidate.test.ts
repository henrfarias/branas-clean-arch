import { CouponValidate } from "../../src/application/usecase/couponValidate"
import { CouponRepositoryMemory } from "../../src/infra/repository/couponRepositoryMemory"

describe('Coupon validate use case', () => {
  test('should return a valid coupon to order', async () => {
    const input = 'VALE20'
    const validator = new CouponValidate(new CouponRepositoryMemory())
    const validCoupon = await validator.validate(input)
    expect(validCoupon).toStrictEqual({ code: 'VALE20', percentage: 0.2 })
  })

  test('should return a valid coupon to order', async () => {
    const input = 'VALE30'
    const validator = new CouponValidate(new CouponRepositoryMemory())
    try {
      await validator.validate(input)
    } catch (error) {
      expect(error).toStrictEqual(new Error('Coupon not found'))
    }
    expect.assertions(1)
  })
})
