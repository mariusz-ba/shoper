import { BasketMutationsTypes } from './basketMutations';
import basketService from '../../../services/basketService';

export const BasketActionsTypes = {
  FETCH_PRODUCTS: 'FETCH_PRODUCTS'
};

export const BasketActions = {
  [BasketActionsTypes.FETCH_PRODUCTS]({ commit }) {
    commit(BasketMutationsTypes.FETCH_PRODUCTS_START);

    basketService().getProducts()
      .then(data => {
        commit(BasketMutationsTypes.FETCH_PRODUCTS_SUCCESS, data);
      });
  }
};