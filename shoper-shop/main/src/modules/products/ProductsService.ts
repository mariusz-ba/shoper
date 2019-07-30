import { NotFoundException } from '../../core/exceptions/NotFoundException';
import { Product } from './ProductEntity';

export class ProductsService {
  private static instance: ProductsService;
  private constructor() {}

  static getInstance(): ProductsService {
    if (!ProductsService.instance) {
      ProductsService.instance = new ProductsService();
    }

    return ProductsService.instance;
  }

  async getProducts(): Promise<Product[]> {
    return Product.find();
  }

  async getProduct(id: number): Promise<Product> {
    const product = await Product.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found.`);
    }

    return product;
  }
}
