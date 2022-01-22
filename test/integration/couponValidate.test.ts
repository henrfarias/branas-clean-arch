import { CouponValidate } from '../../src/application/usecase/couponValidate'
import { DatabaseConnectionAdapter } from '../../src/infra/database/databaseConnectionAdapter'
import { CouponRepositoryDatabase } from '../../src/infra/repository/couponRepositoryDatabase'

describe('Coupon validate use case', () => {
  const databaseConnection = new DatabaseConnectionAdapter()
  test('should return a valid coupon to order', async () => {
    const input = 'VALE20'
    const validator = new CouponValidate(
      new CouponRepositoryDatabase(databaseConnection)
    )
    const validCoupon = await validator.validate(input)
    expect(validCoupon).toStrictEqual({ code: 'VALE20', percentage: 20 })
  })

  test('should return a valid coupon to order', async () => {
    const input = 'VALE30'
    const validator = new CouponValidate(
      new CouponRepositoryDatabase(databaseConnection)
    )
    try {
      await validator.validate(input)
    } catch (error) {
      expect(error).toStrictEqual(new Error('Coupon not found'))
    }
    expect.assertions(1)
  })
})
