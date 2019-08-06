import { GenericController } from './GenericController';
import { CategoriesModule } from '../categories/CategoriesModule';

export class GenericModule {
  public readonly genericController = new GenericController(
    CategoriesModule.getInstance().categoriesService
  );

  private static instance: GenericModule;
  private constructor() {}

  static getInstance(): GenericModule {
    if (!GenericModule.instance) {
      GenericModule.instance = new GenericModule();
    }

    return GenericModule.instance;
  }
}
