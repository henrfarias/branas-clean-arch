import { Coupon } from '../../domain/entity/coupon'
import { ICoupon } from '../../domain/entity/interfaces/iCoupon'
import { ICouponRepository } from '../../domain/repository/couponRepository'

export class CouponRepositoryMemory implements ICouponRepository {
  coupons: ICoupon[]
  constructor() {
    this.coupons = [
      {
        code: 'VALE20',
        percentage: 20,
      },
    ]
  }
  public async findByCode(code: string): Promise<Coupon> {
    const coupon = this.coupons.find((coupon) => coupon.code === code)
    if (!coupon) throw new Error('Coupon not found')
    return Coupon.create(coupon.code, coupon.percentage, coupon.expireIn)
  }
}
