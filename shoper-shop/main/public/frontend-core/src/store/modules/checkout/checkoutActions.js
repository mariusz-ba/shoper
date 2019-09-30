import accountService from '../../../services/accountService';
import checkoutService from '../../../services/checkoutService';
import { CheckoutMutationsTypes } from './checkoutMutations';

export const CheckoutActionsTypes = {
  FETCH_USER_ADDRESSES: 'FETCH_USER_ADDRESSES',
  FETCH_DELIVERY_METHODS: 'FETCH_DELIVERY_METHODS'
};

export const CheckoutActions = {
  [CheckoutActionsTypes.FETCH_USER_ADDRESSES]({ commit }, userId) {
    return accountService()
      .getUserAddresses(userId)
      .then(addresses => {
        commit(CheckoutMutationsTypes.SET_USER_BILLING_ADDRESS, addresses.billing);
        commit(CheckoutMutationsTypes.SET_USER_DELIVERY_ADDRESS, addresses.delivery);
      });
  },
  [CheckoutActionsTypes.FETCH_DELIVERY_METHODS]({ commit }) {
    return checkoutService()
      .getDeliveryMethods()
      .then(methods => {
        commit(CheckoutMutationsTypes.SET_DELIVERY_METHODS, methods);
      });
  }
}
