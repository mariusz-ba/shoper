import { IsNumber, IsOptional, IsIn } from "class-validator";
import { ProductsSortingType } from "../enum/ProductsSortingType";

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
    ProductsSortingType.PRICE_DESC,
  ])
  sorting: ProductsSortingType;
}
