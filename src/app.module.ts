import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';

import { ProductModule } from './product/product.module';
import { dataSourceConfig } from './config/data.source';
import { StoresModule } from './stores/stores.module';
import { ProductStoreModule } from './product-store/product-store.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.number().required(),
        DB_HOST: joi.string().required(),
        DB_PORT: joi.number().required(),
        DB_USERNAME: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        DB_NAME: joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({ ...dataSourceConfig }),
    ProductModule,
    StoresModule,
    ProductStoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
