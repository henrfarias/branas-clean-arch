import { Request, Response } from 'express'
import { GetOrder } from '../../application/query/getOrder'
import { DatabaseConnectionAdapter } from '../../infra/database/databaseConnectionAdapter'

export const getOrder = () => async (req: Request, res: Response) => {
  const { code } = req.params
  const getOrder = new GetOrder(new DatabaseConnectionAdapter())
  const order = await getOrder.execute(code)
  res.status(200).json(order)
}
