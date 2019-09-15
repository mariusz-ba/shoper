import Vue from 'vue';
import Vuex from 'vuex';

import { GlobalState } from './global/globalState';
import { AuthModule } from './modules/auth/authModule';
import { BasketModule } from './modules/basket/basketModule';
import { ProductsModule } from './modules/products/productsModule';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: GlobalState,
  modules: {
    auth: AuthModule,
    basket: BasketModule,
    products: ProductsModule
  }
});
