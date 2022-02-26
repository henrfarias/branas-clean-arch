import Order from "../../domain/entities/order";
import PlaceOrderOutput from "./place-order-output";

export default class PlaceOrderOutputAssembler {
  static assembly(order: Order) {
    const total = order.getTotal()
    const code = order.code.value
    return new PlaceOrderOutput(code, total)
  }
}