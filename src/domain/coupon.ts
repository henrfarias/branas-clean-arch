import { ICoupon } from '../interfaces/iCoupon'

export class Coupon {
  readonly code: string
  readonly percentage: number

  constructor(coupon: ICoupon) {
    this.code = coupon.code
    this.percentage = coupon.percentage
  }

  static create(code: string, percentage: number) {
    const factor = percentage / 100
    if (factor >= 1) {
      throw new Error('Invalid coupon')
    }
    return new Coupon({ code, percentage: factor })
  }
}
