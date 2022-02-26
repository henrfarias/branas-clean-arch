import Order from '../../domain/entities/order'
import AbstractRepositoryFactory from '../../domain/factory/abstract-repository-factory'
import CouponRepository from '../../domain/repository/coupon-repository'
import ItemRepository from '../../domain/repository/item-repository'
import OrderRepository from '../../domain/repository/order-repository'
import PlaceOrderInput from '../dto/place-order-input'
import PlaceOrderOutputAssembler from '../dto/place-order-output-assembler'

export default class PlaceOrder {
  itemRepository: ItemRepository
  couponRepository: CouponRepository
  orderRepository: OrderRepository

  constructor(abstractRepositoryFactory: AbstractRepositoryFactory) {
    this.itemRepository = abstractRepositoryFactory.createItemRepository()
    this.couponRepository = abstractRepositoryFactory.createCouponRepository()
    this.orderRepository = abstractRepositoryFactory.createOrderRepository()
  }

  async execute(input: PlaceOrderInput): Promise<any> {
    let sequence = await this.orderRepository.count()
    const order = new Order(input.cpf, input.issueDate, ++sequence)
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.findById(orderItem.idItem)
      order.addItem(item, orderItem.quantity)
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.findByCode(input.coupon)
      order.addCoupon(coupon)
    }
    this.orderRepository.save(order)
    return PlaceOrderOutputAssembler.assembly(order)
  }
}
