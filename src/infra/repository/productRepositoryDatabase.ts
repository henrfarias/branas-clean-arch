import { Product } from '../../domain/entity/product'
import { ProductRepository } from '../../domain/repository/productRepository'
import { DatabaseConnection } from '../database/databaseConnection'

export class ProductRepositoryDatabase implements ProductRepository {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  async findById(id: number): Promise<Product> {
    const [result] = await this.databaseConnection.query('select * from public.products where id=$1', [id])
    if (!result) throw new Error('Product not found')
    return new Product(result)
  }
}
