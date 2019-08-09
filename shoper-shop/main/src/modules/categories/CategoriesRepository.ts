import { EntityRepository, TreeRepository, In } from 'typeorm';
import { Category } from '../../entities/CategoryEntity';

@EntityRepository(Category)
export class CategoriesRepository extends TreeRepository<Category> {
  async getCategories(): Promise<Category[]> {
    return this.find();
  }

  async getCategoriesTree(): Promise<Category[]> {
    return this.findTrees();
  }

  async getCategoryPath(category: Category): Promise<Category[]> {
    const resultTree = await this.query(
      'SELECT nsleft, nsright FROM category WHERE id = ?',
      [category.id]
    );
    
    const resultPath = await this.query(
      'SELECT id FROM category WHERE nsleft <= ? AND nsright >= ?',
      [
        resultTree[0].nsleft,
        resultTree[0].nsright
      ]
    );

    const ids = resultPath.map((row: any) => row.id);

    return this.find({ id: In(ids) });
  }
}
