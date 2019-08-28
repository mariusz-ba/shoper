export const BasketMutationsTypes = {
  FETCH_PRODUCTS_START: 'FETCH_PRODUCTS_START',
  FETCH_PRODUCTS_SUCCESS: 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_ERROR: 'FETCH_PRODUCTS_ERROR'
};

export const BasketMutations = {
  [BasketMutationsTypes.FETCH_PRODUCTS_START](state) {
    state.isFetching = true;
  },
  [BasketMutationsTypes.FETCH_PRODUCTS_SUCCESS](state, data) {
    state.isFetching = false;
    state.products = data.products;
    state.summary = data.summary;
  },
  [BasketMutationsTypes.FETCH_PRODUCTS_ERROR](state, error) {
    state.isFetching = false;
    state.error = error;
  }
};
