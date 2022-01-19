import { Cpf } from '../../domain/entity/cpf'
import { Order } from '../../domain/entity/order'
import { Product } from '../../domain/entity/product'
import { IOrderRepository } from '../../domain/repository/orderRepository'
import { IProductRepository } from '../../domain/repository/productRepository'
import { IOrderItemInput } from '../dto/orderItemInput'

export class PlaceOrder {
  constructor(readonly productRepository: IProductRepository, readonly orderRepository: IOrderRepository) {}

  async execute(cpf: string, orderItems: IOrderItemInput[]): Promise<any> {
    const order = Order.create(new Cpf(cpf))
    for (const item of orderItems) {
      const foundItem = await this.productRepository.findById(item.id)
      order.addProduct(foundItem, item.quantity)
    }
    this.orderRepository.save(order)
    return {
      total: order.getTotal()
    }
  }
}
