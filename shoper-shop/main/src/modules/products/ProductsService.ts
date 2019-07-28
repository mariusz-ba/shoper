import { NotFoundException } from "../../core/exceptions/NotFoundException";

interface Product {
  id: number;
  name: string;
  price: number;
}

export class ProductsService {  
  private readonly products: Product[] = [
    { id: 1, name: 'Shoes', price: 100 },
    { id: 2, name: 'T-Shirt', price: 90.99 }
  ];

  private static instance: ProductsService;
  private constructor() {}

  static getInstance(): ProductsService {
    if (!ProductsService.instance) {
      ProductsService.instance = new ProductsService();
    }

    return ProductsService.instance;
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number): Product {
    const product = this.products.find(product => product.id === id);

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found.`);
    }

    return product;
  }
}