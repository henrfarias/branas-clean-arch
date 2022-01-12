import { ICoupon } from '../interfaces/iCoupon'

export class Coupon {
  readonly code: string
  readonly percentage: number
  readonly expireIn: Date

  constructor(coupon: ICoupon) {
    this.code = coupon.code
    this.percentage = coupon.percentage
    this.expireIn = coupon.expireIn
  }

  static create(code: string, percentage: number, expireIn: Date) {
    const factor = percentage / 100
    if (factor >= 1) throw new Error('Invalid coupon')
    return new Coupon({ code, percentage: factor, expireIn })
  }
}
