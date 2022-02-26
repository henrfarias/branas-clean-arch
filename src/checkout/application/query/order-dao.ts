import OrderDTO from './order-dto';
import OrderItemDTO from './order-item-dto';

export default interface OrderDAO {
  getOrders(): Promise<OrderDTO[]>
  getOrder(code: string): Promise<OrderDTO>
  getOrderItems(idOrder: number): Promise<OrderItemDTO[]>
}
