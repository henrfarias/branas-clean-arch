import { Cpf } from '../../domain/entity/cpf'
import { Order } from '../../domain/entity/order'
import { ICouponRepository } from '../../domain/repository/couponRepository'
import { IOrderRepository } from '../../domain/repository/orderRepository'
import { IProductRepository } from '../../domain/repository/productRepository'
import { IOrderItemInput } from '../dto/orderItemInput'

export class PlaceOrder {
  constructor(
    readonly productRepository: IProductRepository,
    readonly orderRepository: IOrderRepository,
    readonly couponRepository: ICouponRepository
  ) {}

  async execute(cpf: string, orderItems: IOrderItemInput[], couponCode?: string): Promise<any> {
    const order = Order.create(new Cpf(cpf))
    for (const item of orderItems) {
      const foundItem = await this.productRepository.findById(item.id)
      order.addProduct(foundItem, item.quantity)
    }
    if (couponCode) {
      const coupon = await this.couponRepository.findByCode(couponCode)
      order.addCoupon(coupon)
    }
    this.orderRepository.save(order)
    return {
      total: order.getTotal(),
    }
  }
}
