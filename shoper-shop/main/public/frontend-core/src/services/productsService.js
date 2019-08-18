import axios from 'axios';

let service;

class ProductsService {
  getProducts(filter) {
    return axios.get('/api/products', { params: filter })
      .then(res => res.data);
  }

  getProduct(id) {
    return axios.get(`/api/products/${id}`)
      .then(res => res.data);
  }
}

export function productsService() {
  if (!service) {
    service = new ProductsService();
  }

  return service;
}
