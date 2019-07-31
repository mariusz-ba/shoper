import { getCustomRepository } from 'typeorm';
import { ProductsController } from './ProductsController';
import { ProductsService } from './ProductsService';
import { ProductsRepository } from './ProductsRepository';

export class ProductsModule {
  public readonly productsRepository = getCustomRepository(ProductsRepository);
  public readonly productsService = new ProductsService(
    this.productsRepository
  );
  public readonly productsController = new ProductsController(
    this.productsService
  );

  private static instance: ProductsModule;
  private constructor() {}

  static getInstance(): ProductsModule {
    if (!ProductsModule.instance) {
      ProductsModule.instance = new ProductsModule();
    }

    return ProductsModule.instance;
  }
}
