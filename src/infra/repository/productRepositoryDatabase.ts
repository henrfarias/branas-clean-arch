import { Product } from '../../domain/entity/product'
import { IProductRepository } from '../../domain/repository/productRepository'
import { IDatabaseConnection } from '../database/databaseConnection'

export class ProductRepositoryDatabase implements IProductRepository {
  constructor(readonly databaseConnection: IDatabaseConnection) {}

  async findById(id: number): Promise<Product> {
    const [result] = await this.databaseConnection.query('select * from project.products where id=$1', [id])
    if (!result) throw new Error('Product not found')
    return new Product(result)
  }
}
