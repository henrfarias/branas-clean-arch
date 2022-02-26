import Coupon from '../entities/coupon'

export default interface CouponRepository {
  findByCode(code: string): Promise<Coupon>
}
