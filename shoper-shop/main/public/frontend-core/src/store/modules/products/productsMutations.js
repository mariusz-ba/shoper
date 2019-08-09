import mapKeys from 'lodash/mapKeys';

export const ProductsMutationsTypes = {
  FETCH_PRODUCTS_START: 'FETCH_PRODUCTS_START',
  FETCH_PRODUCTS_SUCCESS: 'FETCH_PRODUCTS_SUCCESS'
};

export const ProductsMutations = {
  [ProductsMutationsTypes.FETCH_PRODUCTS_START](state) {
    state.isFetching = true;
  },
  [ProductsMutationsTypes.FETCH_PRODUCTS_SUCCESS](state, payload) {
    state.products = mapKeys(payload.products, 'id');
    state.categoryPath = payload.categoryPath;
    state.isFetching = false;
  }
};
