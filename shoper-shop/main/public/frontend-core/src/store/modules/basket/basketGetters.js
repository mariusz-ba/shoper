export const BasketGetters = {
  totalPrice(state) {
    return state.products.reduce(
      (total, product) => total + product.totalPrice,
      0
    );
  },
  totalAmount(state) {
    return state.products.reduce(
      (total, product) => total + product.amount,
      0
    );
  }
};
