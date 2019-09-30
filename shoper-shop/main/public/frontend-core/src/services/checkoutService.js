// import axios from 'axios';

let service;

class Price {
  constructor(value, currencyCode) {
    this.numeric = value;
    this.currencyCode = currencyCode;
    this.text = `${this.numeric.toFixed(2)} ${this.currencyCode}`;
  }
}

const deliveryOptions = [
  {
    id: 1,
    name: 'DPD',
    price: new Price(12, 'EUR')
  },
  {
    id: 2,
    name: 'Post',
    price: new Price(9.5, 'EUR')
  },
  {
    id: 3,
    name: 'Pick in store',
    price: new Price(0, 'EUR')
  }
];

const getDeliveryMethods = () => {
  return new Promise(resolve => {
    resolve(deliveryOptions);
  });
}

const getPaymentMethods = () => {
  return new Promise(resolve => {
    const options = [
      { id: 1, name: 'Credit card' },
      { id: 2, name: 'Bank transfer' },
      { id: 3, name: 'Cash in store' },
      { id: 4, name: 'Credit card in store'}
    ];

    resolve(options);
  });
}

class CheckoutService {
  getDeliveryMethods() {
    return getDeliveryMethods();
    // return axios.get('/api/delivery')
    //   .then(res => res.data);
  }

  getPaymentMethods() {
    return getPaymentMethods();
    // return axios.get('/api/payments')
    //   .then(res => res.data);
  }
}

function checkoutService() {
  if (!service) {
    service = new CheckoutService();
  }

  return service;
}

export default checkoutService;
