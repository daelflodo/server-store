import { ProductType } from 'src/common';
import { IProduct } from '../../common/interfaces/product.interface';
import { BaseEntity } from '../../config/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'products' })
export class Product extends BaseEntity implements IProduct {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: false, type: 'enum', enum: ProductType })
  type: ProductType;
}
