export const ProductsGetters = {
  productsList(state) {
    return Object.values(state.products);
  },
  category(state) {
    return state.categoryPath[state.categoryPath.length - 1]
  }
};
