import { BasketProductDto } from './dto/BasketProductDto';
import { Product } from '../../entities/ProductEntity';

export class BasketProduct extends BasketProductDto {
  productDetails: Product | null | undefined;
  totalPrice: number;
}
