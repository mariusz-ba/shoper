import { Repository, EntityRepository, In, Between, MoreThanOrEqual, LessThanOrEqual, MoreThan } from 'typeorm';
import { Product } from '../../entities/ProductEntity';
import { GetProductsDto, ProductFilter } from './dto/GetProductsDto';
import { ProductsSortingType } from './enum/ProductsSortingType';
import { BasketProductDto } from '../basket/dto/BasketProductDto';
import { createPrice } from '../../core/price/createPrice';
import { ProductVariation } from '../../entities/ProductVariationEntity';
import { Stock } from '../../entities/StockEntity';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {

  async getAvailableProductIds(variations: number[]): Promise<number[]> {
    const stocks = await Stock.find({
      relations: ['product'],
      where: {
        variation: { id: In(variations) },
        amount: MoreThan(0)
      }
    });

    const productIds = stocks.map(stock => stock.product.id);

    return [...new Set(productIds)];
  }

  async getProducts(filterDto: GetProductsDto): Promise<Product[]> {
    const { sorting, filter } = filterDto;
    let query = this.createGetProductsQuery(filterDto);

    if (filter.variations && filter.variations.length) {
      const productIds = await this.getAvailableProductIds(filter.variations);

      if (productIds.length === 0) {
        return [];
      }

      query = {
        ...query,
        where: {
          ...query.where,
          id: In(productIds)
        }
      };
    }

    const page = filterDto.page || 1;
    const limit = filterDto.limit || 30;

    query = {
      ...query,
      take: limit,
      skip: limit * (page - 1)
    };

    switch (sorting) {
      case ProductsSortingType.NEWEST:
        query = { ...query, order: { id: 'DESC' } };
        break;
      case ProductsSortingType.PRICE_ASC:
        query = { ...query, order: { price: 'ASC' } };
        break;
      case ProductsSortingType.PRICE_DESC:
        query = { ...query, order: { price: 'DESC' } };
        break;
    }

    return this.find(query);
  }

  async getProductsCount(filterDto: GetProductsDto): Promise<number> {
    let query = this.createGetProductsQuery(filterDto);

    if (filterDto.filter.variations && filterDto.filter.variations.length) {
      const productIds = await this.getAvailableProductIds(filterDto.filter.variations);

      if (productIds.length === 0) {
        return 0;
      }

      query = {
        ...query,
        where: {
          ...query.where,
          id: In(productIds)
        }
      };
    }

    return this.count(query);
  }

  async getProductsVariations(filterDto: GetProductsDto): Promise<ProductVariation[]> {
    const query = this.createGetProductsQuery(filterDto);
    const products = await this.find(query);
    const variations = products.map(product => {
      return product.stocks.map(stock => ({
        id: stock.variation.id,
        name: stock.variation.name
      }));
    });

    const variationsUnique: any = {};

    for (let i = 0; i < variations.length; ++i) {
      for (let j = 0; j < variations[i].length; ++j) {
        variationsUnique[variations[i][j].id] = variations[i][j];
      }
    }

    return Object.values(variationsUnique);
  }

  createGetProductsQuery(filterDto: GetProductsDto): any {
    const { categories } = filterDto;

    let query: any = {
      relations: ['category', 'images', 'stocks', 'stocks.variation']
    };

    const getPrice = (filter: ProductFilter): { price?: any } => {
      const result: { price?: any } = {};

      if (filter.priceFrom && filter.priceTo) result.price = Between(createPrice(filter.priceFrom), createPrice(filter.priceTo));
      else if (filter.priceFrom) result.price = MoreThanOrEqual(createPrice(filter.priceFrom));
      else if (filter.priceTo) result.price = LessThanOrEqual(createPrice(filter.priceTo));

      return result;
    }

    if (categories) {
      query = {
        ...query,
        where: {
          category: { id: In(categories) },
          ...getPrice(filterDto.filter)
        }
      };
    }

    return query;
  }

  async getBasketProducts(
    basketProductDtoList: BasketProductDto[]
  ): Promise<Product[]> {
    const productsIds = basketProductDtoList.map(item => item.productId);

    if (productsIds.length === 0) {
      return [];
    }

    return this.find({
      relations: ['category', 'images', 'stocks', 'stocks.variation'],
      where: {
        id: In(productsIds)
      }
    });
  }
}
