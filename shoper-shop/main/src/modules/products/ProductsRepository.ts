import { Repository, EntityRepository } from 'typeorm';
import { Product } from './ProductEntity';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {}
