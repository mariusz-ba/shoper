import Vue from 'vue';
import Vuex from 'vuex';

import { BasketModule } from './modules/basket/basketModule';
import { ProductsModule } from './modules/products/productsModule';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    basket: BasketModule,
    products: ProductsModule
  }
});
