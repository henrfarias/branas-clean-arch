import { Coupon } from '../../domain/entity/coupon'
import { ICouponRepository } from '../../domain/repository/couponRepository'
import { IDatabaseConnection } from '../database/databaseConnection'

export class CouponRepositoryDatabase implements ICouponRepository {
  constructor(readonly databaseConnection: IDatabaseConnection) {}

  async findByCode(code: string): Promise<Coupon> {
    const [couponData] = await this.databaseConnection.query(
      'select * from project.coupons where code=$1',
      [code]
    )
    if (!couponData) throw new Error('Coupon not found')
    const coupon = Coupon.create(
      couponData.code,
      couponData.percentage,
      couponData.expireIn
    )
    return coupon
  }
}
