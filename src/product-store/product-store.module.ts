import { Module } from '@nestjs/common';
import { ProductStoreService } from './product-store.service';
import { ProductStoreController } from './product-store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Store } from 'src/stores/entities/store.entity';
import { ProductService } from 'src/product/product.service';
import { StoresService } from 'src/stores/stores.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product, Store])
  ],
  controllers: [ProductStoreController],
  providers: [ProductStoreService],
})
export class ProductStoreModule {}
