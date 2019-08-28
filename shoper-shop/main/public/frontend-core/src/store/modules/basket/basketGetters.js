export const BasketGetters = {
  totalAmount(state) {
    return state.products.reduce(
      (total, product) => total + product.amount,
      0
    );
  }
};
