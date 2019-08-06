import { getCustomRepository } from 'typeorm';
import { CategoriesController } from './CategoriesController';
import { CategoriesService } from './CategoriesService';
import { CategoriesRepository } from './CategoriesRepository';

export class CategoriesModule {
  public readonly categoriesRepository = getCustomRepository(CategoriesRepository);
  public readonly categoriesService = new CategoriesService(
    this.categoriesRepository
  );
  public readonly categoriesController = new CategoriesController(
    this.categoriesService
  );

  private static instance: CategoriesModule;
  private constructor() {}

  static getInstance(): CategoriesModule {
    if (!CategoriesModule.instance) {
      CategoriesModule.instance = new CategoriesModule();
    }

    return CategoriesModule.instance;
  }
}
