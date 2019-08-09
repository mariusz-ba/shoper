import { getCustomRepository } from 'typeorm';
import { ProductsController } from './ProductsController';
import { ProductsService } from './ProductsService';
import { ProductsRepository } from './ProductsRepository';
import { CategoriesModule } from '../categories/CategoriesModule';

export class ProductsModule {
  private readonly categoriesService = CategoriesModule.getInstance().categoriesService;
  public readonly productsRepository = getCustomRepository(ProductsRepository);
  public readonly productsService = new ProductsService(
    this.productsRepository,
    this.categoriesService
  );
  public readonly productsController = new ProductsController(
    this.productsService,
    this.categoriesService
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
