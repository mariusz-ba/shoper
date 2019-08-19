import { BasketController } from './BasketController';
import { ProductsModule } from '../products/ProductsModule';
import { BasketService } from './BasketService';

export class BasketModule {
  private readonly productsService = ProductsModule.getInstance().productsService;
  public readonly basketService = new BasketService(this.productsService);
  public readonly basketController = new BasketController(this.basketService);

  private static instance: BasketModule;
  private constructor() {}

  static getInstance() {
    if (!BasketModule.instance) {
      BasketModule.instance = new BasketModule();
    }

    return BasketModule.instance;
  }
}
