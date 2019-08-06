import { Repository, EntityRepository } from 'typeorm';
import { Category } from '../../entities/CategoryEntity';

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {
  async getCategories(): Promise<Category[]> {
    return this.find({ relations: ['parent'] })
  }
}
