import { NotFoundException } from '../../core/exceptions/NotFoundException';
import { ProductsRepository } from './ProductsRepository';
import { Product } from './ProductEntity';

export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getProducts(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async getProduct(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found.`);
    }

    return product;
  }
}
