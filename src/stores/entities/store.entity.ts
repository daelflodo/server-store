import { Entity, Column, ManyToMany } from 'typeorm';

import { IStore } from '../../common';
import { BaseEntity } from '../../config/base.entity';
import { Product } from '../../product/entities/product.entity';

@Entity({ name: 'stores' })
export class Store extends BaseEntity implements IStore {
  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @ManyToMany(() => Product)
  products: Product[];
}
