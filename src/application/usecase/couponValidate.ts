import { ICouponRepository } from "../../domain/repository/couponRepository";

export class CouponValidate {
  constructor(readonly couponRepository: ICouponRepository) {}

  public async validate(input: string) {
    const coupon = await this.couponRepository.findByCode(input)
    return {
      code: coupon.code,
      percentage: coupon.getPercentage()
    }
  }
}