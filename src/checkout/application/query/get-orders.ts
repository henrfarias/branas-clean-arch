import GetOrderOutput from '../dto/get-order-output'
import OrderDAO from './order-dao'

export default class GetOrders {
  constructor(readonly orderDAO: OrderDAO) {}

  async execute(): Promise<GetOrderOutput[]> {
    const getOrdersOutput: GetOrderOutput[] = []
    const ordersData = await this.orderDAO.getOrders()
    for (const orderData of ordersData) {
      const orderItemsData = await this.orderDAO.getOrderItems(orderData.id)
      const getOrderOutput = new GetOrderOutput(
        orderData.code,
        orderData.cpf,
        orderItemsData,
        orderData.freight,
        orderData.total
      )
      getOrdersOutput.push(getOrderOutput)
    }
    return getOrdersOutput
  }
}
