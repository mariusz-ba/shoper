import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
