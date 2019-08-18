import Vue from 'vue';
import VueRouter from 'vue-router';

import AboutPage from '../pages/AboutPage/AboutPage.vue';
import HomePage from '../pages/HomePage/HomePage.vue';
import ProductsListPage from '../pages/ProductsListPage/ProductsListPage.vue';
import ProductDetailsPage from '../pages/ProductDetailsPage/ProductDetailsPage.vue';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.vue';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    name: 'products-list-page',
    path: '/cat/:category',
    component: ProductsListPage
  },
  {
    path: '/about',
    component: AboutPage
  },
  {
    path: '/product/:id',
    component: ProductDetailsPage
  },
  {
    path: '/not-found',
    component: NotFoundPage
  }
];

export const router = new VueRouter({
  mode: 'history',
  routes
});
