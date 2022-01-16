import { Product } from '../entity/product'

export interface ProductRepository {
  findById(id: number): Promise<Product>
}
