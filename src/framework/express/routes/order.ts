import { Router } from 'express'
import { getOrder } from '../../../controllers/orders/getOrder'
import { placeOrder } from '../../../controllers/orders/placeOrder'

export default (router: Router): void => {
  router.get('/orders/:code', getOrder())
  router.post('/orders', placeOrder())
}
