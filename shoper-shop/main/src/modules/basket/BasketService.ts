import { Request } from 'express';
import { ProductsService } from '../products/ProductsService';
import { BasketProductDto } from './dto/BasketProductDto';
import { NotFoundException } from '../../core/exceptions/NotFoundException';
import { BadRequestException } from '../../core/exceptions/BadRequestException';
import { BasketProduct } from './BasketProduct';

export interface BasketRequest extends Request {
  session: Express.Session;
}

export class BasketService {
  constructor(private readonly productsService: ProductsService) {}

  getProducts(req: BasketRequest): BasketProductDto[] {
    if (!req.session.basket) {
      req.session.basket = [];
    }

    return req.session.basket;
  }

  async getProductsDetails(req: BasketRequest): Promise<BasketProduct[]> {
    const products = this.getProducts(req);
    return this.productsService.getBasketProducts(products);
  }

  async addProduct(
    req: BasketRequest,
    productDto: BasketProductDto
  ): Promise<BasketProduct[]> {
    const products = this.getProducts(req);
    const product = products.find(
      product =>
        product.productId === productDto.productId &&
        product.variationId === productDto.variationId
    );

    productDto.amount = product
      ? product.amount + productDto.amount
      : productDto.amount;

    const productAmountValidation = await this.validateProductAmount(productDto);

    if (!productAmountValidation.valid) {
      throw new BadRequestException(
        'Given amount of products is not available',
        {
          amount: productAmountValidation.limit
        }
      );
    }

    if (product) {
      product.amount = productDto.amount;
    } else {
      req.session.basket.push(productDto);
    }

    return this.getProductsDetails(req);
  }

  async removeProduct(
    req: BasketRequest,
    productId: number,
    variationId: number
  ): Promise<BasketProduct[]> {
    const productIndex = req.session.basket.findIndex(
      (product: BasketProductDto) =>
        product.productId === productId &&
        product.variationId === variationId
    );

    if (productIndex === -1) {
      new NotFoundException(`Product with id ${productId} not found in basket`);
    }

    req.session.basket.splice(productIndex, 1);

    return this.getProductsDetails(req);
  }

  async updateProduct(
    req: BasketRequest,
    productDto: BasketProductDto
  ): Promise<BasketProduct[]> {
    const products = this.getProducts(req);
    const product = products.find(
      product =>
        product.productId === productDto.productId &&
        product.variationId === productDto.variationId
    );

    if (!product) {
      throw new NotFoundException(
        `Product with ID ${productDto.productId} and variation ${productDto.variationId} does not exist in basket.`
      );
    }

    const productAmountValidation = await this.validateProductAmount(productDto);

    if (!productAmountValidation.valid) {
      throw new BadRequestException(
        `The maximum amount for given product variations is ${productAmountValidation.limit}`
      );
    }

    product.amount = productDto.amount;

    return this.getProductsDetails(req);
  }

  async validateProductAmount(productDto: BasketProductDto): Promise<{ valid: Boolean, limit: Number }> {
    const productDetails = await this.productsService.getProduct(productDto.productId);
    const variationStock = productDetails.stocks.find(stock => stock.variation.id === productDto.variationId);
    const result = {
      valid: true,
      limit: variationStock ? variationStock.amount : 0
    };

    if (!variationStock || productDto.amount > variationStock.amount) {
      result.valid = false;
    }

    return result;
  }
}
