import Vue from 'vue';
import VueRouter from 'vue-router';

import AboutPage from '../pages/AboutPage/AboutPage.vue';
import HomePage from '../pages/HomePage/HomePage.vue';
import ProductsListPage from '../pages/ProductsListPage/ProductsListPage.vue';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/products',
    component: ProductsListPage
  },
  {
    path: '/about',
    component: AboutPage
  }
];

export const router = new VueRouter({
  mode: 'history',
  routes
});
