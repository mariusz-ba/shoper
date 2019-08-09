import { NotFoundException } from '../../core/exceptions/NotFoundException';
import { CategoriesRepository } from './CategoriesRepository';
import { Category } from '../../entities/CategoryEntity';

export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async getCategories(): Promise<Category[]> {
    return this.categoriesRepository.getCategories();
  }

  async getCategory(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne(id);

    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found.`);
    }

    return category;
  }

  async getCategoriesTree(): Promise<Category[]> {
    return this.categoriesRepository.getCategoriesTree();
  }

  async getCategoryPath(id: number): Promise<Category[]> {
    const category = await this.getCategory(id);
    return this.categoriesRepository.getCategoryPath(category);
  }

  async getChildrenCategories(category: Category): Promise<Category[]> {
    return this.categoriesRepository.findDescendants(category);
  }
}
