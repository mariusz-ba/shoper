import { Router, Request, Response } from 'express';
import { Validator } from 'class-validator';
import { Controller } from '../../core/controllers/ControllerInterface';
import { BadRequestException } from '../../core/exceptions/BadRequestException';
import { ProductsService } from './ProductsService';
import { exceptionsCatcher } from '../../middleware/exceptionsCatcher';

const validator = new Validator();

export class ProductsController implements Controller {
  public readonly path: string = '/api/products';
  public readonly router: Router = Router();

  constructor(private readonly productsService: ProductsService) {
    this.router.get('/', exceptionsCatcher(this.getProducts.bind(this)));
    this.router.get('/:id', exceptionsCatcher(this.getProduct.bind(this)));
  }

  async getProducts(req: Request, res: Response) {
    const products = await this.productsService.getProducts();
    res.json(products);
  }

  async getProduct(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!validator.isNumber(id)) {
      throw new BadRequestException('Product id must be a number');
    }

    const product = await this.productsService.getProduct(id);
    res.json(product);
  }
}
