import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Product } from '../product/entities/product.entity';
import { Store } from '../stores/entities/store.entity';
import { createCustomException } from '../common';
import { CreateProductStoreDto } from './dto/create-product-store.dto';

@Injectable()
export class ProductStoreService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async addStoreToProduct(productId: string, storeId: string) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['stores'],
    });

    const store = await this.storeRepository.findOne({
      where: { id: storeId },
    });

    if (!product || !store) {
      throw createCustomException(
        'Product or Store not found',
        404,
        'Product-store',
      );
    }

    const storeAlreadyAdded = product.stores.some(
      (storedStore) => storedStore.id === storeId,
    );
    if (storeAlreadyAdded) {
      return product;
    }

    product.stores.push(store);
    await this.productRepository.save(product);
    return product;
  }

  async findStoresFromProduct(productId: string) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['stores'],
    });

    if (!product) {
      throw createCustomException('Product not found', 404, 'Product-store');
    }

    return product.stores;
  }

  async findStoreFromProduct(productId: string, storeId: string) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['stores'],
    });

    if (!product) {
      throw createCustomException('Product not found', 404, 'Product-store');
    }

    const store = product.stores.find((store) => store.id === storeId);
    if (!store) {
      throw createCustomException(
        'Store not found for this product',
        404,
        'Product-store',
      );
    }

    return store;
  }

  async updateStoresFromProduct(
    productId: string,
    createProductStoreDto: CreateProductStoreDto,
  ) {
    const { storeIds } = createProductStoreDto;

    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['stores'],
    });

    if (!product) {
      throw createCustomException('Product not found', 404, 'Product-store');
    }

    const stores = await this.storeRepository.findBy({
      id: In(storeIds),
    });

    if (stores.length !== storeIds.length) {
      throw createCustomException(
        'One or more stores not found',
        404,
        'Product-store',
      );
    }

    product.stores = stores;
    await this.productRepository.save(product);

    return product;
  }

  async deleteStoreFromProduct(productId: string, storeId: string) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['stores'],
    });

    if (!product) {
      throw createCustomException('Product not found', 404, 'Product-store');
    }

    const storeIndex = product.stores.findIndex(
      (store) => store.id === storeId,
    );
    if (storeIndex === -1) {
      throw createCustomException(
        'Store not found for this product',
        404,
        'Product-store',
      );
    }

    product.stores.splice(storeIndex, 1);
    await this.productRepository.save(product);

    return product;
  }
}