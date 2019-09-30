import { CheckoutState } from './checkoutState';
import { CheckoutMutations } from './checkoutMutations';
import { CheckoutActions } from './checkoutActions';
import { CheckoutGetters } from './checkoutGetters';

export const CheckoutModule = {
  namespaced: true,
  state: CheckoutState,
  mutations: CheckoutMutations,
  actions: CheckoutActions,
  getters: CheckoutGetters
};
