import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Category } from './CategoryEntity';
import { ProductVariation } from './ProductVariationEntity';
import { ProductImage } from './ProductImageEntity';

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

  @ManyToMany(() => ProductVariation)
  @JoinTable()
  variations: ProductVariation[];

  @OneToMany(() => ProductImage, productImage => productImage.product)
  images: ProductImage[];
}
