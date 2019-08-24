import axios from 'axios';

let service;

class BasketService {
  getProducts() {
    return axios.get('/api/basket')
      .then(res => res.data);
  }

  addProduct(productId, variationId, amount) {
    return axios.post(`/api/basket/${productId}/${variationId}`, { amount })
      .then(res => res.data);
  }

  updateProduct(productId, variationId, amount) {
    return axios.put(`/api/basket/${productId}/${variationId}`, { amount })
      .then(res => res.data);
  }

  removeProduct(productId, variationId) {
    return axios.delete(`/api/basket/${productId}/${variationId}`)
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
