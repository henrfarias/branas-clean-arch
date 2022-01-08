import { Order } from '../domain/order'
import { Product } from '../domain/product'

const main = () => {
  const product = Product.create({
    name: 'mouse',
    price: 58,
    quantity: 1,
    description: 'logitech',
  })
  console.time()
  const order = Order.create([product])
  console.log(order.get)
  order.writeDescription('Compra na black friday com 40% de desconto')
  order.applyDiscount(0.4)
  order.execute()
  console.log(order.get)
  console.timeEnd()
}

main()
