import { IsNumber, IsOptional } from "class-validator";

export class GetProductsDto {
  @IsOptional()
  @IsNumber()
  category: number;

  @IsOptional()
  categories: number[];
}
