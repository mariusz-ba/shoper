import { Repository, EntityRepository, In } from 'typeorm';
import { Product } from '../../entities/ProductEntity';
import { GetProductsDto } from './dto/GetProductsDto';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  async getProducts(filterDto: GetProductsDto): Promise<Product[]> {
    const { categories } = filterDto;

    let query: any = {
      relations: ['category', 'variations', 'images']
    }

    if (categories) {
      query = {
        ...query,
        where: {
          category: { id: In(categories) }
        }
      };
    }

    return this.find(query);
  }
}
