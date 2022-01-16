import { Product } from "../../domain/entity/product"
import { IProductRepository } from "../../domain/repository/productRepository"

export class ProductRepositoryMemory implements IProductRepository {
  products: Product[]

  constructor() {
    this.products = [
      Product.create({
        id: 1,
        name: 'lápis',
        price: 2,
        description: 'Faber-castell',
      }),
      Product.create({
        id: 2,
        name: 'caneta',
        price: 3.7,
        description: 'Pilot',
      }),
      Product.create({
        id: 3,
        name: 'caderno',
        price: 20,
        description: 'Tilibra',
      }),
    ]
  }

  async findById(id: number): Promise<Product> {
    const product = this.products.find((prod) => prod.getId() === id)
    if (!product) throw new Error('Product not found')
    return product
  }
}
