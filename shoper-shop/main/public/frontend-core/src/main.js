import Vue from 'vue';
import App from './App.vue';

import { router } from './router/router';
import { store } from './store/store';

// Register base components globally so theres no need of importing
// them every single time.
import BaseButton from './components/BaseButton/BaseButton.vue';
Vue.component('base-button', BaseButton);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});
