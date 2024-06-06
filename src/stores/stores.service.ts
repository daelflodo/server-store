import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateStoreDto, UpdateStoreDto } from './dto';
import { Store } from './entities/store.entity';
import { IResponse, IStore, createCustomException } from '../common';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}
  async create(createStoreDto: CreateStoreDto): Promise<IStore> {
    if (createStoreDto.city.length !== 3) {
      throw createCustomException(
        'the city of the store is a three-character code',
        400,
        'Store',
      );
    }
    createStoreDto.city = createStoreDto.city.toUpperCase();
    return await this.storeRepository.save(createStoreDto);
  }

  async findAll(): Promise<IStore[]> {
    return await this.storeRepository.find({});
  }

  async findOne(id: string): Promise<IStore> {
    const store = await this.storeRepository.findOne({
      where: { id },
    });
    if (!store) throw createCustomException('Store not Found', 404, 'Store');
    return store;
  }

  async update(id: string, updateStoreDto: UpdateStoreDto): Promise<IStore> {
    if (updateStoreDto.city && updateStoreDto.city.length !== 3) {
      throw createCustomException(
        'the city of the store is a three-character code',
        400,
        'Store',
      );
    }
    await this.findOne(id);
    await this.storeRepository.update(id, updateStoreDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<IResponse> {
    await this.findOne(id);

    await this.storeRepository.delete(id);

    return {
      message: 'The product was successfully removed',
      code: 'OK_STORE_DELETE',
    };
  }
}
