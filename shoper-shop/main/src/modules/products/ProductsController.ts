import { Router, Request, Response } from 'express';
import { Validator } from 'class-validator';
import { Controller } from '../../core/controllers/ControllerInterface';
import { BadRequestException } from '../../core/exceptions/BadRequestException';
import { ProductsService } from './ProductsService';
import { exceptionsCatcher } from '../../middleware/exceptionsCatcher';
import { CreateProductDto } from './dto/CreateProductDto';
import { GetProductsDto } from './dto/GetProductsDto';

const validator = new Validator();

export class ProductsController implements Controller {
  public readonly path: string = '/api/products';
  public readonly router: Router = Router();

  constructor(private readonly productsService: ProductsService) {
    this.router.get('/', exceptionsCatcher(this.getProducts.bind(this)));
    this.router.get('/:id', exceptionsCatcher(this.getProduct.bind(this)));
    this.router.post('/', exceptionsCatcher(this.createProduct.bind(this)));
  }

  async getProducts(req: Request, res: Response) {
    const filterDto = new GetProductsDto();
    filterDto.category = Number(req.query.category) || req.query.category;

    const errors = await validator.validate(filterDto);

    if (errors.length) {
      throw new BadRequestException('Invalid arguments', errors);
    }

    const products = await this.productsService.getProducts(filterDto);

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

  async createProduct(req: Request, res: Response) {
    const createProductDto = new CreateProductDto();
    createProductDto.name = req.body.name;
    createProductDto.price = Number(req.body.price) || req.body.price;

    const errors = await validator.validate(createProductDto);

    if (errors.length) {
      throw new BadRequestException('Invalid arguments', errors);
    }

    const product = await this.productsService.createProduct(createProductDto);

    res.json(product);
  }
}
