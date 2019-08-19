import { Repository, EntityRepository, In } from 'typeorm';
import { Product } from '../../entities/ProductEntity';
import { GetProductsDto } from './dto/GetProductsDto';
import { ProductsSortingType } from './enum/ProductsSortingType';
import { BasketProductDto } from '../basket/dto/BasketProductDto';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  async getProducts(filterDto: GetProductsDto): Promise<Product[]> {
    const { sorting } = filterDto;
    let query = this.createGetProductsQuery(filterDto);

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
    const query = this.createGetProductsQuery(filterDto);
    return this.count(query);
  }

  createGetProductsQuery(filterDto: GetProductsDto): any {
    const { categories } = filterDto;

    let query: any = {
      relations: ['category', 'variations', 'images']
    };

    if (categories) {
      query = {
        ...query,
        where: {
          category: { id: In(categories) }
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
      relations: ['category', 'variations', 'images'],
      where: {
        id: In(productsIds)
      }
    });
  }
}
