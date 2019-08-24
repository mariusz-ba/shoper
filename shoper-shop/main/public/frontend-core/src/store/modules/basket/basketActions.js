import { BasketMutationsTypes } from './basketMutations';
import basketService from '../../../services/basketService';

export const BasketActionsTypes = {
  FETCH_PRODUCTS: 'FETCH_PRODUCTS',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  REMOVE_PRODUCT: 'REMOVE_PRODUCT'
};

export const BasketActions = {
  [BasketActionsTypes.FETCH_PRODUCTS]({ commit }) {
    commit(BasketMutationsTypes.FETCH_PRODUCTS_START);

    return basketService()
      .getProducts()
      .then(data => {
        commit(BasketMutationsTypes.FETCH_PRODUCTS_SUCCESS, data);
      });
  },
  [BasketActionsTypes.UPDATE_PRODUCT]({ commit }, payload) {
    const { productId, variationId, amount } = payload;

    commit(BasketMutationsTypes.FETCH_PRODUCTS_START);

    return basketService()
      .updateProduct(productId, variationId, amount)
      .then(data => {
        commit(BasketMutationsTypes.FETCH_PRODUCTS_SUCCESS, data);
      })
      .catch(() => {
        commit(BasketMutationsTypes.FETCH_PRODUCTS_ERROR, 'An error occured during product update');
      });
  },
  [BasketActionsTypes.REMOVE_PRODUCT]({ commit }, payload) {
    const { productId, variationId } = payload;

    commit(BasketMutationsTypes.FETCH_PRODUCTS_START);

    return basketService()
      .removeProduct(productId, variationId)
      .then(data => {
        commit(BasketMutationsTypes.FETCH_PRODUCTS_SUCCESS, data);
      })
      .catch(() => {
        commit(BasketMutationsTypes.FETCH_PRODUCTS_ERROR, 'An error occured while removing product');
      });
  }
};
