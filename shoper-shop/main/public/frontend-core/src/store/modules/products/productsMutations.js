import mapKeys from 'lodash/mapKeys';

export const ProductsMutationsTypes = {
  FETCH_PRODUCTS_START: 'FETCH_PRODUCTS_START',
  FETCH_PRODUCTS_SUCCESS: 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCT_START: 'FETCH_PRODUCT_START',
  FETCH_PRODUCT_SUCCESS: 'FETCH_PRODUCT_SUCCESS'
};

export const ProductsMutations = {
  [ProductsMutationsTypes.FETCH_PRODUCTS_START](state) {
    state.isFetching = true;
  },
  [ProductsMutationsTypes.FETCH_PRODUCTS_SUCCESS](state, payload) {
    state.products = mapKeys(payload.products, 'id');
    state.productsCount = payload.productsCount || payload.products.length;
    state.categoryPath = payload.categoryPath;
    state.variations = payload.variations,
    state.isFetching = false;
  },
  [ProductsMutationsTypes.FETCH_PRODUCT_START](state) {
    state.isFetching = false;
  },
  [ProductsMutationsTypes.FETCH_PRODUCT_SUCCESS](state, payload) {
    state.isFetching = false;
    state.products = {
      ...state.products,
      [payload.id]: payload
    };
  }
};
