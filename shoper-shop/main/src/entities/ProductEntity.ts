import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  JoinTable
} from 'typeorm';
import { Category } from './CategoryEntity';
import { ProductImage } from './ProductImageEntity';
import { Stock } from './StockEntity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => Stock, stock => stock.product)
  @JoinTable()
  stocks: Stock[];

  @OneToMany(() => ProductImage, productImage => productImage.product)
  images: ProductImage[];
}
