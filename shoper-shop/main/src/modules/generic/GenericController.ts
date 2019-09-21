import { Router, Request, Response } from 'express';
import { Controller } from '../../core/controllers/ControllerInterface';
import { exceptionsCatcher } from '../../middleware/exceptionsCatcher';
import { CategoriesService } from '../categories/CategoriesService';
import { BasketService } from '../basket/BasketService';
import { TranslationsService } from '../translations/TranslationsService';
import { SessionRequest } from '../../core/interfaces/SessionRequest';

export class GenericController implements Controller {
  public readonly path: string = '*';
  public readonly router: Router = Router();

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly basketService: BasketService,
    private readonly translationsService: TranslationsService
  ) {
    this.router.get('*', exceptionsCatcher(this.getFrontendApplication.bind(this)));
  }

  async getFrontendApplication(req: SessionRequest, res: Response) {
    const categoriesTree = await this.categoriesService.getCategoriesTree();
    const basketProducts = await this.basketService.getProductsDetails(req);
    const translations = await this.translationsService.getTranslations('en');

    res.render('index', {
      categoriesTree,
      basketProducts,
      sessionInformation: req.session.user || null,
      translations
    });
  }
}
