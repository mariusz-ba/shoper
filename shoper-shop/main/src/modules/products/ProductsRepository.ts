import { Repository, EntityRepository } from 'typeorm';
import { Product } from '../../entities/ProductEntity';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  async getProducts(): Promise<Product[]> {
    const queryBuilder = this.createQueryBuilder('product');

    queryBuilder.leftJoinAndMapOne('product.category', 'product.category', 'category');
    queryBuilder.leftJoinAndMapMany('product.variations', 'product.variations', 'product_variation');
    queryBuilder.leftJoinAndMapMany('product.images', 'product.images', 'product_image');

    const products = await queryBuilder.getMany();

    return products;
  }
}
