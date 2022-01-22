import { ICoupon } from './interfaces/iCoupon'

export class Coupon {
  readonly code: string
  readonly percentage: number
  readonly expireIn?: Date

  constructor(coupon: ICoupon) {
    this.code = coupon.code
    this.percentage = coupon.percentage
    this.expireIn = coupon.expireIn
  }

  static create(code: string, percentage: number, expireIn?: Date) {
    const factor = +percentage / 100
    if (factor >= 1) throw new Error('Invalid coupon')
    return new Coupon({ code, percentage: factor, expireIn })
  }

  public isExpire(today: Date = new Date()) {
    if (!this.expireIn) return false
    return today.getTime() > this.expireIn.getTime()
  }

  public getPercentage() {
    const percentage = this.percentage * 100
    return percentage
  }
}
