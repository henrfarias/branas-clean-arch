import { Product } from '../entity/product'

export interface IProductRepository {
  findById(id: number): Promise<Product>
}
