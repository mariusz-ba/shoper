import { ProductsMutationsTypes } from './productsMutations';
import { productsService } from '../../../services/productsService';

export const ProductsActionsTypes = {
  FETCH_PRODUCTS: 'FETCH_PRODUCTS'
};

export const ProductsActions = {
  [ProductsActionsTypes.FETCH_PRODUCTS]({ commit }, filter) {
    commit(ProductsMutationsTypes.FETCH_PRODUCTS_START);

    return productsService().getProducts()
      .then(products => {
        commit(ProductsMutationsTypes.FETCH_PRODUCTS_SUCCESS, products);
      });
  }
}
