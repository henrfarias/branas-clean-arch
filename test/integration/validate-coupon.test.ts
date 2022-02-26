import ValidateCoupon from "../../src/checkout/application/usecases/validate-coupon"
import DatabaseConnectionAdapter from "../../src/checkout/infra/database/database-connection-adapter"
import CouponRepositoryDatabase from "../../src/checkout/infra/repository/coupon-repository-database"

test('Deve validar o cupom de desconto', async function () {
  const databaseConnection = new DatabaseConnectionAdapter()
  const couponRepository = new CouponRepositoryDatabase(databaseConnection)
  const validateCoupon = new ValidateCoupon(couponRepository)
  const isValid = await validateCoupon.execute('VALE20', new Date('2021-10-01'))
  expect(isValid).toBeTruthy()
})