import { Cpf } from '../../domain/entity/cpf'
import { Order } from '../../domain/entity/order'
import { Product } from '../../domain/entity/product'
import { IProductRepository } from '../../domain/repository/productRepository'

export class PlaceOrder {
  constructor(readonly productRepository: IProductRepository) {}

  async execute(cpf: string, orderItems: any[]): Promise<any> {
    const order = Order.create(new Cpf(cpf))
    for (const item of orderItems) {
      const foundItem = await this.productRepository.findById(item.id)
      order.addProduct(foundItem, item.quantity)
    }
    return {
      total: order.getTotal()
    }
  }
}
