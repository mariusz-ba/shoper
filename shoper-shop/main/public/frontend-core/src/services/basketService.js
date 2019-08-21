import axios from 'axios';

let service;

class BasketService {
  addProduct(productId, variationId, amount) {
    return axios.post('/api/basket', { productId, variationId, amount })
      .then(res => res.data);
  }

  getProducts() {
    return axios.get('/api/basket')
      .then(res => res.data);
  }
}

function basketService() {
  if (!service) {
    service = new BasketService();
  }

  return service;
}

export default basketService;
