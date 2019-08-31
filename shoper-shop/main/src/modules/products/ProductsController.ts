import { Router, Request, Response } from 'express';
import { Validator } from 'class-validator';
import { Controller } from '../../core/controllers/ControllerInterface';
import { BadRequestException } from '../../core/exceptions/BadRequestException';
import { UnauthorizedException } from '../../core/exceptions/UnauthorizedException';
import { ProductsService } from './ProductsService';
import { exceptionsCatcher } from '../../middleware/exceptionsCatcher';
import { CreateProductDto } from './dto/CreateProductDto';
import { GetProductsDto, ProductFilter } from './dto/GetProductsDto';
import { CategoriesService } from '../categories/CategoriesService';
import { calculatePrice } from '../../core/price/calculatePrice';

const validator = new Validator();

export class ProductsController implements Controller {
  public readonly path: string = '/api/products';
  public readonly router: Router = Router();

  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService
  ) {
    this.router.get('/', exceptionsCatcher(this.getProducts.bind(this)));
    this.router.get('/:id', exceptionsCatcher(this.getProduct.bind(this)));
    this.router.post('/', exceptionsCatcher(this.createProduct.bind(this)));
  }

  async getProducts(req: Request, res: Response) {
    let queryFilters: any = {};

    try {
      queryFilters = req.query.filters ? JSON.parse(req.query.filters) : {}
    } catch (e) {
      throw new BadRequestException('Invalid filter argument');
    }

    const filterDto = new GetProductsDto();
    filterDto.category = Number(req.query.category) || req.query.category;
    filterDto.limit = Number(req.query.limit) || req.query.limit;
    filterDto.page = Number(req.query.page) || req.query.page;
    filterDto.sorting = req.query.sorting || 'oldest';
    filterDto.filter = new ProductFilter();

    if (queryFilters.priceFrom) {
      filterDto.filter.priceFrom = Number(queryFilters.priceFrom) || queryFilters.priceFrom;
    }

    if (queryFilters.priceTo) {
      filterDto.filter.priceTo = Number(queryFilters.priceTo) || queryFilters.priceTo;
    }

    if (queryFilters.variations) {
      if (Array.isArray(queryFilters.variations)) {
        filterDto.filter.variations = queryFilters.variations;
      } else {
        filterDto.filter.variations = [Number(queryFilters.variations)];
      }
    }

    const errors = await validator.validate(filterDto);

    if (errors.length) {
      throw new BadRequestException('Invalid arguments', errors);
    }

    const products = await this.productsService.getProducts(filterDto);
    const productsCount = await this.productsService.getProductsCount(filterDto);
    const categoryPath = await this.categoriesService.getCategoryPath(filterDto.category);
    const variations = await this.productsService.getProductsVariations(filterDto);

    const productsMapped = products.map(
      product => ({
        ...product,
        price: calculatePrice(product.price)
      })
    );

    res.json({
      products: productsMapped,
      categoryPath,
      productsCount,
      variations
    });
  }

  async getProduct(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!validator.isNumber(id)) {
      throw new BadRequestException('Product id must be a number');
    }

    const product = await this.productsService.getProduct(id);
    
    res.json({
      ...product,
      price: calculatePrice(product.price)
    });
  }

  async createProduct(req: Request, res: Response) {
    // Throw exception until authorization is implemented
    throw new UnauthorizedException('You are not authorized');

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
