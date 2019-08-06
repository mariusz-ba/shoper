import Vue from 'vue';
import Vuex from 'vuex';

import { ProductsModule } from './modules/products/productsModule';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    products: ProductsModule
  }
})