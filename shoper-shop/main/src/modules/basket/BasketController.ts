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
    this.router.post('/:productId/:variationId', exceptionsCatcher(this.addProduct.bind(this)));
    this.router.put('/:productId/:variationId', exceptionsCatcher(this.updateProduct.bind(this)));
    this.router.delete('/:productId/:variationId', exceptionsCatcher(this.removeProduct.bind(this)));
  }

  async getBasket(req: BasketRequest, res: Response) {
    res.json(await this.basketService.getProductsDetails(req));
  }

  async addProduct(req: BasketRequest, res: Response) {
    const { productId, variationId } = req.params;
    const { amount } = req.body;

    const productDto = new BasketProductDto();
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
    const productId = Number(req.params.productId) || req.params.productId;
    const variationId = Number(req.params.variationId) || req.params.variationId;

    if (
      !validator.isNumber(productId) ||
      !validator.isNumber(variationId)
    ) {
      throw new BadRequestException('Product id and variation must be a numbers');
    }

    res.json(await this.basketService.removeProduct(req, productId, variationId));
  }

  async updateProduct(req: BasketRequest, res: Response) {
    const { productId, variationId } = req.params;
    const { amount } = req.body;

    const productDto = new BasketProductDto();
    productDto.productId = Number(productId) || productId;
    productDto.variationId = Number(variationId) || variationId;
    productDto.amount = Number(amount) || amount;

    const errors = await validator.validate(productDto);

    if (errors.length) {
      throw new BadRequestException('Invalid arguments', errors);
    }

    res.json(await this.basketService.updateProduct(req, productDto));
  }
}
