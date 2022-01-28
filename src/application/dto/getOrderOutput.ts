export interface IGetOrderOutput {
  id: number
  code: string
  cpf: string
  issue_date: Date
  freight: number
  description: string
  total: number
  order_items: any[]
}