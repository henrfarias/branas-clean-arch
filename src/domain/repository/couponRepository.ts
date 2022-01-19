import { Coupon } from "../entity/coupon";

export interface ICouponRepository {
  findByCode(code: string): Promise<Coupon>
}