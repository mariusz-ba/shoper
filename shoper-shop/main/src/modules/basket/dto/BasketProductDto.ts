import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class BasketProductDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsOptional()
  @IsNumber()
  variationId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}