import {
  BaseEntity,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';
import { Product } from './ProductEntity';

export enum ProductImageType {
  MAIN = 'MAIN',
  FRONT = 'FRONT',
  BACK = 'BACK'
}

@Entity()
export class ProductImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @Column()
  type: ProductImageType;

  @ManyToOne(() => Product, product => product.images)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
