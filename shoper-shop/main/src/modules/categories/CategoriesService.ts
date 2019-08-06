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
    const categories = await this.getCategories();

    const map: any = {};
    const roots: Category[] = [];

    for (let i = 0; i < categories.length; ++i) {
      map[categories[i].id] = i;
      categories[i].children = [];
    }

    for (let i = 0; i < categories.length; ++i) {
      const node = categories[i];
      
      if (node.parent && node.parent.id && categories[map[node.parent.id]]) {
        categories[map[node.parent.id]].children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }
}
