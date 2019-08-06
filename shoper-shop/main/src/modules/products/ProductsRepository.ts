import { Repository, EntityRepository } from 'typeorm';
import { Product } from '../../entities/ProductEntity';
import { GetProductsDto } from './dto/GetProductsDto';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  async getProducts(filterDto: GetProductsDto): Promise<Product[]> {
    const { category } = filterDto;

    const query: any = {
      relations: ['category', 'variations', 'images']
    }

    if (category) {
      query.where = { category: { id: category }};
    }

    return this.find(query);
  }
}
