export const ProductsGetters = {
  productsList(state) {
    return Object.values(state.products);
  }
};
