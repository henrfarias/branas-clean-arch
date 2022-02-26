import Coupon from '../../src/checkout/domain/entities/coupon'

test('Deve criar um cupom de desconto', function () {
  const coupon = new Coupon('VALE20', 20, new Date('2022-10-10'))
  const isExpired = coupon.isExpired(new Date('2022-10-10'))
  expect(isExpired).toBeFalsy()
})

test('Deve criar um cupom de desconto inválido', function () {
  const coupon = new Coupon('VALE20', 20, new Date('2022-10-10'))
  const isExpired = coupon.isExpired(new Date('2022-10-11'))
  expect(isExpired).toBeTruthy()
})

test('Deve criar um cupom de desconto que não expira nunca', function () {
  const coupon = new Coupon('VALE20', 20)
  const isExpired = coupon.isExpired()
  expect(isExpired).toBeFalsy()
})
