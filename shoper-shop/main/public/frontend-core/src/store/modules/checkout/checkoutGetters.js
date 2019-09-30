export const CheckoutGetters = {
  deliveryPrice(state) {
    const { methods, methodId } = state.delivery;

    if (methodId && methods[methodId]) {
      return methods[methodId].price;
    }

    return {
      text: '0 EUR',
      numeric: 0,
      currencyCode: 'EUR'
    };
  }
};
