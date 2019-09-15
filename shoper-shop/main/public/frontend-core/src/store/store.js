import Vue from 'vue';
import Vuex from 'vuex';

import { GlobalState } from './global/globalState';
import { BasketModule } from './modules/basket/basketModule';
import { ProductsModule } from './modules/products/productsModule';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: GlobalState,
  modules: {
    basket: BasketModule,
    products: ProductsModule
  }
});
