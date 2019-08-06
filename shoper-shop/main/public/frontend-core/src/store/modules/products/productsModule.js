import { ProductsState } from './productsState';
import { ProductsMutations } from './productsMutations';
import { ProductsActions } from './productsActions';
import { ProductsGetters } from './productsGetters';

export const ProductsModule = {
  namespaced: true,
  state: ProductsState,
  mutations: ProductsMutations,
  actions: ProductsActions,
  getters: ProductsGetters
};
