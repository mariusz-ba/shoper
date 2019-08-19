import { Router, Response } from 'express';
import { Validator } from 'class-validator';
import { Controller } from '../../core/controllers/ControllerInterface';
import { BasketProductDto } from './dto/BasketProductDto';
import { exceptionsCatcher } from '../../middleware/exceptionsCatcher';
import { BadRequestException } from '../../core/exceptions/BadRequestException';
import { BasketService, BasketRequest } from './BasketService';

const validator = new Validator();

export class BasketController implements Controller {
  public readonly path: string = '/api/basket';
  public readonly router: Router = Router();

  constructor(private readonly basketService: BasketService) {
    this.router.get('/', exceptionsCatcher(this.getBasket.bind(this)));
    this.router.post('/', exceptionsCatcher(this.addProduct.bind(this)));
    this.router.delete('/', exceptionsCatcher(this.removeProduct.bind(this)));
  }

  async getBasket(req: BasketRequest, res: Response) {
    res.json(await this.basketService.getProductsDetails(req));
  }

  async addProduct(req: BasketRequest, res: Response) {
    const { productId, variationId, amount } = req.body;

    const productDto = new BasketProductDto;
    productDto.productId = Number(productId) || productId;
    productDto.variationId = Number(variationId) || variationId;
    productDto.amount = Number(amount) || amount;

    const errors = await validator.validate(productDto);

    if (errors.length) {
      throw new BadRequestException('Invalid arguments', errors);
    }

    res.json(await this.basketService.addProduct(req, productDto));
  }

  async removeProduct(req: BasketRequest, res: Response) {
    const productId = Number(req.body.productId) || req.body.productId;

    if (!validator.isNumber(productId)) {
      throw new BadRequestException('Product id must be a number');
    }

    const result = await this.basketService.removeProduct(req, productId);

    if (result.error) {
      throw result.error;
    }

    res.json(result.ok);
  }
}
