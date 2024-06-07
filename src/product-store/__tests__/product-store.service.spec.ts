import { Test, TestingModule } from '@nestjs/testing';
import { ProductStoreService } from '../product-store.service';
import { Product } from '../../product/entities/product.entity';
import { Store } from '../../stores/entities/store.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductStoreService', () => {
    let service: ProductStoreService;
    let productRepository: Repository<Product>;
    let storeRepository: Repository<Store>;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ProductStoreService,
          {
            provide: getRepositoryToken(Product),
            useClass: Repository,
          },
          {
            provide: getRepositoryToken(Store),
            useClass: Repository,
          },
        ],
      }).compile();
  
      service = module.get<ProductStoreService>(ProductStoreService);
      productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
      storeRepository = module.get<Repository<Store>>(getRepositoryToken(Store));
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  
    describe('addStoreToProduct', () => {
      it('should be defined', () => {
        expect(service.addStoreToProduct).toBeDefined();
      });

      it('should throw an error if the product or store is not found', async () => {
        jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);
        jest.spyOn(storeRepository, 'findOne').mockResolvedValue(null);
        await expect(service.addStoreToProduct('1', '1')).rejects.toThrow('Product or Store not found');
      });
  
      it('should add a store to the product', async () => {
        const mockProduct = { id: '1', stores: [] } as Product;
        const mockStore = { id: '1' } as Store;
  
        jest.spyOn(productRepository, 'findOne').mockResolvedValue(mockProduct);
        jest.spyOn(storeRepository, 'findOne').mockResolvedValue(mockStore);
        jest.spyOn(productRepository, 'save').mockResolvedValue(mockProduct);
  
        const result = await service.addStoreToProduct('1', '1');
  
        expect(result.stores).toContain(mockStore);
      });
  
      it('should return the product if the store is already added', async () => {
        const mockStore = { id: '1' } as Store;
        const mockProduct = { id: '1', stores: [mockStore] } as Product;
  
        jest.spyOn(productRepository, 'findOne').mockResolvedValue(mockProduct);
        jest.spyOn(storeRepository, 'findOne').mockResolvedValue(mockStore);
  
        const result = await service.addStoreToProduct('1', '1');
  
        expect(result.stores).toHaveLength(1);
        expect(result.stores).toContain(mockStore);
      });
    });

  describe('findStoresFromProduct', () => {
    it('should be defined', () => {
      expect(service.findStoresFromProduct).toBeDefined();
    });
    it('should return stores associated with the product', async () => {
      const mockStore = { id: '1' } as Store;
      const mockProduct = { id: '1', stores: [mockStore] } as Product;

      jest.spyOn(productRepository, 'findOne').mockResolvedValue(mockProduct);

      const result = await service.findStoresFromProduct('1');

      expect(result).toHaveLength(1);
      expect(result).toContain(mockStore);
    });

    it('should throw an error if the product is not found', async () => {
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findStoresFromProduct('1')).rejects.toThrow('Product not found');
    });
  });

  describe('findStoreFromProduct', () => {
    it('should be defined', () => {
      expect(service.findStoreFromProduct).toBeDefined();
    });
    it('should return the store associated with the product', async () => {
      const mockStore = { id: '1' } as Store;
      const mockProduct = { id: '1', stores: [mockStore] } as Product;

      jest.spyOn(productRepository, 'findOne').mockResolvedValue(mockProduct);

      const result = await service.findStoreFromProduct('1', '1');

      expect(result).toBe(mockStore);
    });

    it('should throw an error if the store is not found for the product', async () => {
      const mockProduct = { id: '1', stores: [] } as Product;

      jest.spyOn(productRepository, 'findOne').mockResolvedValue(mockProduct);

      await expect(service.findStoreFromProduct('1', '1')).rejects.toThrow('Store not found for this product');
    });

    it('should throw an error if the product is not found', async () => {
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findStoreFromProduct('1', '1')).rejects.toThrow('Product not found');
    });
  });

  describe('updateStoresFromProduct', () => {
    it('should be defined', () => {
      expect(service.updateStoresFromProduct).toBeDefined();
    });
    it('should update stores for the product', async () => {
      const mockStores = [{ id: '1' }, { id: '2' }] as Store[];
      const mockProduct = { id: '1', stores: [] } as Product;

      jest.spyOn(productRepository, 'findOne').mockResolvedValue(mockProduct);
      jest.spyOn(storeRepository, 'findBy').mockResolvedValue(mockStores);
      jest.spyOn(productRepository, 'save').mockResolvedValue(mockProduct);

      const createProductStoreDto = { storeIds: ['1', '2'] };
      const result = await service.updateStoresFromProduct('1', createProductStoreDto);

      expect(result.stores).toHaveLength(2);
      expect(result.stores).toEqual(mockStores);
    });

    it('should throw an error if the product is not found', async () => {
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);

      const createProductStoreDto = { storeIds: ['1', '2'] };
      await expect(service.updateStoresFromProduct('1', createProductStoreDto)).rejects.toThrow('Product not found');
    });

    it('should throw an error if one or more stores are not found', async () => {
      const mockProduct = { id: '1', stores: [] } as Product;

      jest.spyOn(productRepository, 'findOne').mockResolvedValue(mockProduct);
      jest.spyOn(storeRepository, 'findBy').mockResolvedValue([{ id: '1' }] as Store[]);

      const createProductStoreDto = { storeIds: ['1', '2'] };
      await expect(service.updateStoresFromProduct('1', createProductStoreDto)).rejects.toThrow('One or more stores not found');
    });
  });

  describe('deleteStoreFromProduct', () => {
    it('should be defined', () => {
      expect(service.deleteStoreFromProduct).toBeDefined();
    });
    it('should delete the store from the product', async () => {
      const mockStore = { id: '1' } as Store;
      const mockProduct = { id: '1', stores: [mockStore] } as Product;

      jest.spyOn(productRepository, 'findOne').mockResolvedValue(mockProduct);
      jest.spyOn(productRepository, 'save').mockResolvedValue(mockProduct);

      const result = await service.deleteStoreFromProduct('1', '1');

      expect(result.stores).toHaveLength(0);
    });

    it('should throw an error if the store is not found for the product', async () => {
      const mockProduct = { id: '1', stores: [] } as Product;

      jest.spyOn(productRepository, 'findOne').mockResolvedValue(mockProduct);

      await expect(service.deleteStoreFromProduct('1', '1')).rejects.toThrow('Store not found for this product');
    });

    it('should throw an error if the product is not found', async () => {
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);

      await expect(service.deleteStoreFromProduct('1', '1')).rejects.toThrow('Product not found');
    });
  });
});
