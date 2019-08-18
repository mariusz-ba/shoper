let service;

class BasketService {
  addProduct(productId, variationId, amount) {
    alert(`Adding product ${productId} to basket`);
  }
}

function basketService() {
  if (!service) {
    service = new BasketService();
  }

  return service;
}

export default basketService;