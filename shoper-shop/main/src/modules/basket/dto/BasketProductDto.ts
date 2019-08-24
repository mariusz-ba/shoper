import { IsNotEmpty, IsNumber } from 'class-validator';

export class BasketProductDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  variationId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
