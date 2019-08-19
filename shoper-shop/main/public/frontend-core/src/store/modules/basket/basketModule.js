import { BasketState } from './basketState';
import { BasketMutations } from './basketMutations';
import { BasketActions } from './basketActions';
import { BasketGetters } from './basketGetters';

export const BasketModule = {
  namespaced: true,
  state: BasketState,
  mutations: BasketMutations,
  actions: BasketActions,
  getters: BasketGetters
};
