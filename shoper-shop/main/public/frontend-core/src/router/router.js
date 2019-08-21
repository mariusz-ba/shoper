import Vue from 'vue';
import VueRouter from 'vue-router';

import { routesNames } from './routesNames';

import AboutPage from '../pages/AboutPage/AboutPage.vue';
import BasketPage from '../pages/BasketPage/BasketPage.vue';
import HomePage from '../pages/HomePage/HomePage.vue';
import ProductsListPage from '../pages/ProductsListPage/ProductsListPage.vue';
import ProductDetailsPage from '../pages/ProductDetailsPage/ProductDetailsPage.vue';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.vue';

Vue.use(VueRouter);

export const routes = [
  {
    path: routesNames.homePage.path,
    name: routesNames.homePage.name,
    component: HomePage
  },
  {
    path: routesNames.productsListPage.path,
    name: routesNames.productsListPage.name,
    component: ProductsListPage
  },
  {
    path: routesNames.productDetailsPage.path,
    name: routesNames.productDetailsPage.name,
    component: ProductDetailsPage
  },
  {
    path: routesNames.basketPage.path,
    name: routesNames.basketPage.name,
    component: BasketPage
  },
  {
    path: routesNames.aboutPage.path,
    name: routesNames.aboutPage.name,
    component: AboutPage
  },
  {
    path: routesNames.notFoundPage.path,
    name: routesNames.notFoundPage.name,
    component: NotFoundPage
  }
];

export const router = new VueRouter({
  mode: 'history',
  routes
});
