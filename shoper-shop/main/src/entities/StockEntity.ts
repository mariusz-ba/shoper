import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable
} from 'typeorm';
import { Product } from './ProductEntity';
import { ProductVariation } from './ProductVariationEntity';

@Entity()
export class Stock extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, product => product.stocks)
  product: Product;

  @ManyToOne(() => ProductVariation, variation => variation.stocks)
  @JoinTable()
  variation: ProductVariation;

  @Column()
  amount: number;
}
