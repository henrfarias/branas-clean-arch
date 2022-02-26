import Item from "../entities/item";

export default interface ItemRepository {
  findById(idItem: number): Promise<Item>
}

