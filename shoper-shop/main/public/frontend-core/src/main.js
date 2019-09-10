import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';

import { router } from './router/router';
import { store } from './store/store';
import { translations } from './utils/js/translations';

// Register base components globally
import BaseInput from './components/Base/BaseInput/BaseInput';
import BaseRadio from './components/Base/BaseRadio/BaseRadio';
import BaseButton from './components/Base/BaseButton/BaseButton';
import BaseSelect from './components/Base/BaseSelect/BaseSelect';
import BaseTextarea from './components/Base/BaseTextarea/BaseTextarea';
import BaseCheckbox from './components/Base/BaseCheckbox/BaseCheckbox';

Vue.component('base-input', BaseInput);
Vue.component('base-radio', BaseRadio);
Vue.component('base-button', BaseButton);
Vue.component('base-select', BaseSelect);
Vue.component('base-textarea', BaseTextarea);
Vue.component('base-checkbox', BaseCheckbox);

Vue.use(VueI18n);

const i18n = new VueI18n(translations);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  i18n
});
