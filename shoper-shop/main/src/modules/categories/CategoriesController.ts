import { Router, Request, Response } from 'express';
import { Controller } from '../../core/controllers/ControllerInterface';
import { BadRequestException } from '../../core/exceptions/BadRequestException';
import { CategoriesService } from './CategoriesService';
import { exceptionsCatcher } from '../../middleware/exceptionsCatcher';
import { Validator } from 'class-validator';

const validator = new Validator();

export class CategoriesController implements Controller {
  public readonly path: string = '/api/categories';
  public readonly router: Router = Router();

  constructor(private readonly categoriesService: CategoriesService) {
    this.router.get('/', exceptionsCatcher(this.getCategories.bind(this)));
    this.router.get('/:id', exceptionsCatcher(this.getCategory.bind(this)));
  }

  async getCategories(req: Request, res: Response) {
    const categories = req.query.tree
      ? await this.categoriesService.getCategoriesTree()
      : await this.categoriesService.getCategories();

    res.json(categories);
  }

  async getCategory(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!validator.isNumber(id)) {
      throw new BadRequestException('Category id must be a number');
    }

    const category = await this.categoriesService.getCategory(id);
    res.json(category);
  }
}
