import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductStoreService } from './product-store.service';
import { ProductStoreController } from './product-store.controller';
import { Product } from '../product/entities/product.entity';
import { Store } from '../stores/entities/store.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Store, User])],
  controllers: [ProductStoreController],
  providers: [ProductStoreService, UserService],
})
export class ProductStoreModule {}
