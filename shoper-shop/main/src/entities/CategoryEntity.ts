import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, TreeParent, TreeChildren, Tree, TreeLevelColumn, ViewColumn, JoinColumn } from "typeorm";
import { Product } from "./ProductEntity";

@Entity()
@Tree('nested-set')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @TreeParent()
  parent: Category;

  @TreeChildren({ cascade: true })
  children: Category[];

  @OneToMany(() => Product, product => product.category)
  products: Product[];
}
