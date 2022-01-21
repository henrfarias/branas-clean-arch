import Coupon from '../../domain/entities/coupon';
import CouponRepository from '../../domain/repository/coupon-repository'
import DatabaseConnection from '../database/database-connection';

export default class CouponRepositoryDatabase implements CouponRepository {
  constructor (readonly databaseConnection: DatabaseConnection) {}

  async findByCode(code: string): Promise<Coupon> {
    const [couponData] = await this.databaseConnection.query('select * from template.coupons where code=$1', [code])
    if (!couponData) throw new Error('Coupon not found')
    const coupon = new Coupon(couponData.code, couponData.percentage, couponData.expire_date)
    return coupon
  }

}
