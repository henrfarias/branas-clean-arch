import GetOrderOutput from '../dto/get-order-output'
import OrderDAO from './order-dao'

export default class GetOrder {
  constructor(readonly orderDAO: OrderDAO) {}

  async execute(code: string): Promise<GetOrderOutput> {

  
    const orderData = await this.orderDAO.getOrder(code)
    const orderItemsData = await this.orderDAO.getOrderItems(orderData.id)
    const getOrderOutput = new GetOrderOutput(
      orderData.code,
      orderData.cpf,
      orderItemsData,
      orderData.freight,
      orderData.total
    )
    return getOrderOutput
  }
}
