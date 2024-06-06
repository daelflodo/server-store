import { IStore } from 'src/common';
import { BaseEntity } from 'src/config/base.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, Column, ManyToMany } from 'typeorm';

@Entity({ name: 'stores' })
export class Store extends BaseEntity implements IStore{

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @ManyToMany(() => Product)
  products: Product[];
}