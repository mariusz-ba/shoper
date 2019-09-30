export const routesNames = {
  homePage: {
    path: '/',
    name: 'homePage'
  },
  productsListPage: {
    path: '/cat/:category',
    name: 'productsListPage'
  },
  productDetailsPage: {
    path: '/product/:id',
    name: 'productsDetailsPage'
  },
  basketPage: {
    path: '/basket',
    name: 'basketPage'
  },
  aboutPage: {
    path: '/about',
    name: 'aboutPage'
  },
  notFoundPage: {
    path: '/not-found',
    name: 'notFoundPage'
  },
  loginPage: {
    path: '/login',
    name: 'loginPage'
  },
  accountPage: {
    path: '/account',
    name: 'accountPage'
  },
  // Checkout
  checkout: {
    path: '/checkout',
    name: 'checkout',
  },
  checkoutLogin: {
    path: 'login',
    name: 'checkoutLogin'
  },
  checkoutDelivery: {
    path: 'delivery',
    name: 'checkoutDelivery'
  },
  checkoutPayment: {
    path: 'payment',
    name: 'checkoutPayment'
  },
  checkoutSummary: {
    path: 'summary',
    name: 'checkoutSummary'
  },
  checkoutSuccess: {
    path: 'success',
    name: 'checkoutSuccess'
  }
};
