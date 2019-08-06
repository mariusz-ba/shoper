import { NotFoundException } from '../../core/exceptions/NotFoundException';
import { ProductsRepository } from './ProductsRepository';
import { Product } from '../../entities/ProductEntity';
import { CreateProductDto } from './dto/CreateProductDto';
import { GetProductsDto } from './dto/GetProductsDto';

export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getProducts(filterDto: GetProductsDto): Promise<Product[]> {
    return this.productsRepository.getProducts(filterDto);
  }

  async getProduct(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found.`);
    }

    return product;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product();
    product.name = createProductDto.name;
    product.price = createProductDto.price;
    await product.save();
    
    return product;
  }
}
