import { initialState } from '../../../utils/js/initialState';

export const BasketState = {
  error: '',
  products: initialState.basketProducts.products,
  summary: initialState.basketProducts.summary,
  isFetching: false
};
