import Item from "../../domain/entities/item"
import DatabaseConnection from "../database/database-connection"
import ItemRepository from "../../domain/repository/item-repository"

export default class ItemRepositoryDatabase implements ItemRepository {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  async findById(idItem: number): Promise<Item> {
    const [item] = await this.databaseConnection.query(
      'select * from public.items where id = $1',
      [idItem]
    )
    return new Item(item.idItem, item.category, item.description, item.price)
  }
}
