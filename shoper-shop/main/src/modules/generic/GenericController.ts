import { Router, Request, Response } from 'express';
import { Controller } from '../../core/controllers/ControllerInterface';
import { exceptionsCatcher } from '../../middleware/exceptionsCatcher';
import { CategoriesService } from '../categories/CategoriesService';
import { BasketService } from '../basket/BasketService';
import { BasketRequest } from '../basket/interfaces/BasketRequest';

export class GenericController implements Controller {
  public readonly path: string = '*';
  public readonly router: Router = Router();

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly basketService: BasketService
  ) {
    this.router.get('*', exceptionsCatcher(this.getFrontendApplication.bind(this)));
  }

  async getFrontendApplication(req: BasketRequest, res: Response) {
    const categoriesTree = await this.categoriesService.getCategoriesTree();
    const basketProducts = await this.basketService.getProductsDetails(req);

    res.render('index', {
      categoriesTree,
      basketProducts
    });
  }
}
