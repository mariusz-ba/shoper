export const BasketMutationsTypes = {
  FETCH_PRODUCTS_START: 'FETCH_PRODUCTS_START',
  FETCH_PRODUCTS_SUCCESS: 'FETCH_PRODUCTS_SUCCESS'
};

export const BasketMutations = {
  [BasketMutationsTypes.FETCH_PRODUCTS_START](state) {
    state.isFetching = true;
  },
  [BasketMutationsTypes.FETCH_PRODUCTS_SUCCESS](state, data) {
    state.products = data;
    state.isFetching = false;
  }
};
