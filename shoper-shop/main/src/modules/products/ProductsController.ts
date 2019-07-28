import { Router, Request, Response } from 'express';
import { Validator } from 'class-validator';
import { Controller } from '../../core/controllers/ControllerInterface';
import { BadRequestException } from '../../core/exceptions/BadRequestException';
import { ProductsService } from './ProductsService';

const validator = new Validator();

export class ProductsController implements Controller {
  public readonly path: string = '/api/products';
  public readonly router: Router = Router();

  private readonly productsService: ProductsService = ProductsService.getInstance();

  private static instance: ProductsController; 
  private constructor() {
    this.router.get('/', this.getProducts.bind(this));
    this.router.get('/:id', this.getProduct.bind(this));
  }

  getProducts(req: Request, res: Response) {
    const products = this.productsService.getProducts();
    res.json(products);
  }

  getProduct(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!validator.isNumber(id)) {
      throw new BadRequestException('Product id must be a number');
    }

    const product = this.productsService.getProduct(id);
    res.json(product);
  }

  static getInstance(): ProductsController {
    if (!ProductsController.instance) {
      ProductsController.instance = new ProductsController();
    }

    return ProductsController.instance;
  }
}