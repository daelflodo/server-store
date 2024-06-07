import { Test, TestingModule } from '@nestjs/testing';
import { StoresService } from '../stores.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../entities/store.entity';
import { CreateStoreDto, UpdateStoreDto } from '../dto';
import { createCustomException } from '../../common';

const mockStoreRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('StoresService', () => {
  let service: StoresService;
  let repository: Repository<Store>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoresService,
        {
          provide: getRepositoryToken(Store),
          useValue: mockStoreRepository,
        },
      ],
    }).compile();

    service = module.get<StoresService>(StoresService);
    repository = module.get<Repository<Store>>(getRepositoryToken(Store));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new store', async () => {
      const createStoreDto: CreateStoreDto = { name: 'New Store', city: 'ABC', address:'Calle 72 #10-34, Chapinero' };
      const savedStore = { id: '1', ...createStoreDto };

      mockStoreRepository.save.mockResolvedValue(savedStore);

      expect(await service.create(createStoreDto)).toEqual(savedStore);
      expect(mockStoreRepository.save).toHaveBeenCalledWith({
        ...createStoreDto,
        city: 'ABC',
      });
    });

    it('should throw an error if city code is not 3 characters', async () => {
      const createStoreDto: CreateStoreDto = { name: 'New Store', city: 'AB', address:'Calle 72 #10-34, Chapinero' };

      await expect(service.create(createStoreDto)).rejects.toThrow(
          'the city of the store is a three-character code',
        // createCustomException(
        //   'the city of the store is a three-character code',
        //   400,
        //   'Store'
        // )
      );
    });
  });

  describe('findAll', () => {
    it('should return all stores', async () => {
      const stores = [{ id: '1', name: 'Store 1', city: 'ABC' }];

      mockStoreRepository.find.mockResolvedValue(stores);

      expect(await service.findAll()).toEqual(stores);
      expect(mockStoreRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a store by ID', async () => {
      const store = { id: '1', name: 'Store 1', city: 'ABC' };

      mockStoreRepository.findOne.mockResolvedValue(store);

      expect(await service.findOne('1')).toEqual(store);
      expect(mockStoreRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw an error if store not found', async () => {
      mockStoreRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow('Store not Found'
        // createCustomException('Store not Found', 404, 'Store')
      );
    });
  });

  describe('update', () => {
    it('should update an existing store', async () => {
      const updateStoreDto: UpdateStoreDto = { name: 'Updated Store', city: 'XYZ' };
      const store = { id: '1', name: 'Store 1', city: 'ABC' };

      mockStoreRepository.findOne.mockResolvedValue(store);
      mockStoreRepository.update.mockResolvedValue(null);
      const updatedStore = { ...store, ...updateStoreDto };

      expect(await service.update('1', updateStoreDto)).toEqual(updatedStore);
      expect(mockStoreRepository.update).toHaveBeenCalledWith('1', updateStoreDto);
    });

    it('should throw an error if city code is not 3 characters', async () => {
      const updateStoreDto: UpdateStoreDto = { name: 'Updated Store', city: 'XY' };

      await expect(service.update('1', updateStoreDto)).rejects.toThrow(
        'the city of the store is a three-character code',
      );
    });
  });


  describe('remove', () => {
    it('should remove a store by ID', async () => {
      const store = { id: '1', name: 'Store 1', city: 'ABC' };

      mockStoreRepository.findOne.mockResolvedValue(store);
      mockStoreRepository.delete.mockResolvedValue(null);

      expect(await service.remove('1')).toEqual({
        message: 'The product was successfully removed',
        code: 'OK_STORE_DELETE',
      });
      expect(mockStoreRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw an error if store not found', async () => {
      mockStoreRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('1')).rejects.toThrow('Store not Found'
        // createCustomException('Store not Found', 404, 'Store')
      );
    });
  });
});
