import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';

import { router } from './router/router';
import { store } from './store/store';
import { translations } from './utils/js/translations';

import {
  ValidationObserver,
  ValidationProvider,
  configure,
  extend
} from 'vee-validate';

import {
  required,
  confirmed,
  email,
  min
} from 'vee-validate/dist/rules';

Vue.component('validation-observer', ValidationObserver);
Vue.component('validation-provider', ValidationProvider);

Vue.use(VueI18n);

const i18n = new VueI18n(translations);

configure({
  defaultMessage: (name, values) => {
    const rule = values._rule_;
    const messages = i18n.messages[i18n.locale];

    const path = name === '{field}'
      ? `validations.${rule}${messages[`validations.${rule}.unnamed`] ? '.unnamed' : ''}`
      : `validations.${rule}${messages[`validations.${rule}.named`] ? '.named' : ''}`;

    return i18n.t(path, values);
  }
});

extend('required', required);
extend('password', confirmed);
extend('email', email);
extend('min', min);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  i18n
});
