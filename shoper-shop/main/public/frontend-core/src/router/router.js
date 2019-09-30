import Vue from 'vue';
import VueRouter from 'vue-router';

import { routesNames } from './routesNames';

import AboutPage from '../pages/AboutPage/AboutPage.vue';
import BasketPage from '../pages/BasketPage/BasketPage.vue';
import HomePage from '../pages/HomePage/HomePage.vue';
import ProductsListPage from '../pages/ProductsListPage/ProductsListPage.vue';
import ProductDetailsPage from '../pages/ProductDetailsPage/ProductDetailsPage.vue';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.vue';
import LoginPage from '../pages/LoginPage/LoginPage.vue';
import AccountPage from '../pages/AccountPage/AccountPage.vue';

// Checkout
import Checkout from '../pages/Checkout/Checkout.vue';
import CheckoutLogin from '../pages/CheckoutLogin/CheckoutLogin.vue';
import CheckoutDelivery from  '../pages/CheckoutDelivery/CheckoutDelivery.vue';
import CheckoutPayment from '../pages/CheckoutPayment/CheckoutPayment.vue';
import CheckoutSummary from '../pages/CheckoutSummary/CheckoutSummary.vue';
import CheckoutSuccess from '../pages/CheckoutSuccess/CheckoutSuccess.vue';

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
  },
  {
    path: routesNames.loginPage.path,
    name: routesNames.loginPage.name,
    component: LoginPage
  },
  {
    path: routesNames.accountPage.path,
    name: routesNames.accountPage.name,
    component: AccountPage
  },
  // Checkout
  {
    path: routesNames.checkout.path,
    name: routesNames.checkout.name,
    component: Checkout,
    children: [
      {
        path: routesNames.checkoutLogin.path,
        name: routesNames.checkoutLogin.name,
        component: CheckoutLogin
      },
      {
        path: routesNames.checkoutDelivery.path,
        name: routesNames.checkoutDelivery.name,
        component: CheckoutDelivery
      },
      {
        path: routesNames.checkoutPayment.path,
        name: routesNames.checkoutPayment.name,
        component: CheckoutPayment
      },
      {
        path: routesNames.checkoutSummary.path,
        name: routesNames.checkoutSummary.name,
        component: CheckoutSummary
      },
      {
        path: routesNames.checkoutSuccess.path,
        name: routesNames.checkoutSuccess.name,
        component: CheckoutSuccess
      }
    ]
  }
];

export const router = new VueRouter({
  mode: 'history',
  routes
});
