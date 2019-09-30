import mapKeys from 'lodash/mapKeys';

export const CheckoutMutationsTypes = {
  SET_USER_BILLING_ADDRESS: 'SET_USER_BILLING_ADDRESS',
  SET_USER_DELIVERY_ADDRESS: 'SET_USER_DELIVERY_ADDRESS',
  SET_BILLING_ADDRESS: 'SET_BILLING_ADDRESS',
  SET_DELIVERY_ADDRESS: 'SET_DELIVERY_ADDRESS',
  SET_DELIVERY_METHOD_ID: 'SET_DELIVERY_METHOD_ID',
  SET_DELIVERY_METHODS: 'SET_DELIVERY_METHODS'
};

export const CheckoutMutations = {
  [CheckoutMutationsTypes.SET_USER_BILLING_ADDRESS](state, address) {
    state.delivery.userBillingAddress = address;
  },
  [CheckoutMutationsTypes.SET_USER_DELIVERY_ADDRESS](state, address) {
    state.delivery.userDeliveryAddress = address;
  },
  [CheckoutMutationsTypes.SET_BILLING_ADDRESS](state, address) {
    state.delivery.billingAddress = address;
  },
  [CheckoutMutationsTypes.SET_DELIVERY_ADDRESS](state, address) {
    state.delivery.deliveryAddress = address;
  },
  [CheckoutMutationsTypes.SET_DELIVERY_METHOD_ID](state, methodId) {
    state.delivery.methodId = methodId;
  },
  [CheckoutMutationsTypes.SET_DELIVERY_METHODS](state, methods) {
    state.delivery.methods = mapKeys(methods, 'id');
  }
};
