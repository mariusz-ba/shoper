import { IsNumber, IsOptional, IsIn, IsBoolean, IsArray } from 'class-validator';
import { ProductsSortingType } from '../enum/ProductsSortingType';

export class ProductFilter {
  @IsNumber()
  @IsOptional()
  priceFrom: number;

  @IsNumber()
  @IsOptional()
  priceTo: number;

  @IsArray()
  @IsOptional()
  variations: number[];
}

export class GetProductsDto {
  @IsOptional()
  @IsNumber()
  category: number;

  @IsOptional()
  categories: number[];

  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsIn([
    ProductsSortingType.NEWEST,
    ProductsSortingType.OLDEST,
    ProductsSortingType.PRICE_ASC,
    ProductsSortingType.PRICE_DESC
  ])
  sorting: ProductsSortingType;

  @IsOptional()
  filter: ProductFilter
}
