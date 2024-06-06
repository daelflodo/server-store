import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IUser } from '../../common';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity implements IUser {
  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;
}
