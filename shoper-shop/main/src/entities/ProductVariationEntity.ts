import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { Stock } from './StockEntity';

export enum ProductVariationType {
  SIZE = 'SIZE',
  LENGTH = 'LENGTH'
}

@Entity()
export class ProductVariation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: ProductVariationType;

  @OneToMany(() => Stock, stock => stock.variation)
  stocks: Stock[];
}
