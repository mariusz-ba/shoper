import { Request } from 'express';
import { ProductsService } from '../products/ProductsService';
import { BasketProductDto } from './dto/BasketProductDto';
import { Result } from '../../core/Result';
import { NotFoundException } from '../../core/exceptions/NotFoundException';
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

  async addProduct(req: BasketRequest, productDto: BasketProductDto): Promise<BasketProduct[]> {
    const products = this.getProducts(req);
    const product = products.find(
      product =>
        product.productId === productDto.productId &&
        product.variationId === productDto.variationId
    );

    if (product) {
      product.amount += productDto.amount;
    } else {
      req.session.basket.push(productDto);
    }

    return this.getProductsDetails(req);
  }

  async removeProduct(
    req: BasketRequest,
    productId: number
  ): Promise<Result<BasketProduct[], NotFoundException>> {
    const productIndex = req.session.basket.findIndex(
      (product: BasketProductDto) => product.productId === productId
    );

    if (productIndex === -1) {
      return new Result({
        error: new NotFoundException(
          `Product with id ${productId} not found in basket`
        )
      });
    }

    req.session.basket.splice(productIndex, 1);

    return new Result({ ok: await this.getProductsDetails(req) });
  }
}
