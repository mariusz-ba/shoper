import { ProductsService } from '../products/ProductsService';
import { BasketProductDto } from './dto/BasketProductDto';
import { NotFoundException } from '../../core/exceptions/NotFoundException';
import { BadRequestException } from '../../core/exceptions/BadRequestException';
import { calculatePrice } from '../../core/price/calculatePrice';
import { SessionRequest } from '../../core/interfaces/SessionRequest';
import { BasketResponse } from './interfaces/BasketResponse';

export class BasketService {
  constructor(private readonly productsService: ProductsService) {}

  getProducts(req: SessionRequest): BasketProductDto[] {
    if (!req.session.basket) {
      req.session.basket = [];
    }

    return req.session.basket;
  }

  async getProductsDetails(req: SessionRequest): Promise<BasketResponse> {
    const products = this.getProducts(req);
    const basketProducts = await this.productsService.getBasketProducts(products);

    const summaryPrice = basketProducts.reduce((total, item) => total + item.totalPrice, 0);
    const deliveryPrice = 0;
    const totalPrice = summaryPrice + deliveryPrice;

    return {
      products: basketProducts.map(
        product => ({
          ...product,
          totalPrice: calculatePrice(product.totalPrice)
        })
      ),
      summary: {
        summaryPrice: calculatePrice(summaryPrice),
        deliveryPrice: calculatePrice(deliveryPrice),
        totalPrice: calculatePrice(totalPrice)
      }
    };
  }

  async addProduct(
    req: SessionRequest,
    productDto: BasketProductDto
  ): Promise<BasketResponse> {
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
        'Product is no longer available',
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
    req: SessionRequest,
    productId: number,
    variationId: number
  ): Promise<BasketResponse> {
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
    req: SessionRequest,
    productDto: BasketProductDto
  ): Promise<BasketResponse> {
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
