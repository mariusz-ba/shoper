import { ProductsMutationsTypes } from './productsMutations';
import { productsService } from '../../../services/productsService';

export const ProductsActionsTypes = {
  FETCH_PRODUCTS: 'FETCH_PRODUCTS',
  FETCH_PRODUCT: 'FETCH_PRODUCT'
};

export const ProductsActions = {
  [ProductsActionsTypes.FETCH_PRODUCTS]({ commit }, filter) {
    commit(ProductsMutationsTypes.FETCH_PRODUCTS_START);

    return productsService()
      .getProducts(filter)
      .then(data => {
        commit(ProductsMutationsTypes.FETCH_PRODUCTS_SUCCESS, data);
      });
  },
  [ProductsActionsTypes.FETCH_PRODUCT]({ commit }, id) {
    commit(ProductsMutationsTypes.FETCH_PRODUCT_START);

    return productsService()
      .getProduct(id)
      .then(data => {
        commit(ProductsMutationsTypes.FETCH_PRODUCT_SUCCESS, data);
      });
  }
};
