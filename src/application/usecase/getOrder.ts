import { Order } from '../../domain/entity/order';
import { IOrderRepository } from '../../domain/repository/orderRepository'

export class GetOrder {
  constructor(private orderRepository: IOrderRepository) {}
  
  public async execute(code: string): Promise<Order> {
    const result = await this.orderRepository.findByCode(code)
    return result.order
  }
}
