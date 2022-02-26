import { Request, Response } from 'express'
import { PlaceOrder } from '../../application/usecase/placeOrder'
import { DatabaseConnectionAdapter } from '../../infra/database/databaseConnectionAdapter'
import { CouponRepositoryDatabase } from '../../infra/repository/couponRepositoryDatabase'
import { OrderRepositoryDatabase } from '../../infra/repository/orderRepositoryDatabase'
import { ProductRepositoryDatabase } from '../../infra/repository/productRepositoryDatabase'

export const placeOrder = () => async (req: Request, res: Response) => {
  const { cpf, items } = req.body
  const databaseConnection = new DatabaseConnectionAdapter()
  const productRepository = new ProductRepositoryDatabase(databaseConnection)
  const orderRepository = new OrderRepositoryDatabase(databaseConnection)
  const couponRepository = new CouponRepositoryDatabase(databaseConnection)
  const usecase = new PlaceOrder(
    productRepository,
    orderRepository,
    couponRepository
  )
  const result = await usecase.execute(cpf, items)
  res.status(201).json(result)
}
