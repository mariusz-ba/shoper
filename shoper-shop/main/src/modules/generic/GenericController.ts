import { Router, Request, Response } from 'express';
import { Controller } from '../../core/controllers/ControllerInterface';
import { exceptionsCatcher } from '../../middleware/exceptionsCatcher';
import { CategoriesService } from '../categories/CategoriesService';

export class GenericController implements Controller {
  public readonly path: string = '*';
  public readonly router: Router = Router();

  constructor(private readonly categoriesService: CategoriesService) {
    this.router.get('*', exceptionsCatcher(this.getFrontendApplication.bind(this)));
  }

  async getFrontendApplication(req: Request, res: Response) {
    const categoriesTree = await this.categoriesService.getCategoriesTree();

    res.render('index', {
      categoriesTree
    });
  }
}
