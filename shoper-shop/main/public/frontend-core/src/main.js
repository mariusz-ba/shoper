import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';

Vue.use(VueI18n);

import { router } from './router/router';
import { store } from './store/store';
import { translations } from './utils/js/translations';

// Register base components globally so theres no need of importing
// them every single time.
import BaseButton from './components/BaseButton/BaseButton.vue';
Vue.component('base-button', BaseButton);

const i18n = new VueI18n(translations);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  i18n
});
