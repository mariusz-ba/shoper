import { BasketProduct } from '../BasketProduct';

export interface BasketResponse {
  products: BasketProduct[];
  summary: {
    summaryPrice: number;
    deliveryPrice: number;
    totalPrice: number;
  }
}