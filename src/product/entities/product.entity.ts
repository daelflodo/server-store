import { ProductType } from '../../common';
import { IProduct } from '../../common/interfaces/product.interface';
import { BaseEntity } from '../../config/base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Store } from '../../stores/entities/store.entity';

@Entity({ name: 'products' })
export class Product extends BaseEntity implements IProduct {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: false, type: 'enum', enum: ProductType })
  type: ProductType;

  @ManyToMany(() => Store)
  @JoinTable({ name: 'product_store' })
  stores: Store[];
}
