// product-store.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ProductStoreController } from '../product-store.controller';
import { ProductStoreService } from '../product-store.service';
import { CreateProductStoreDto } from '../dto/create-product-store.dto';

const mockProductStoreService = {
  addStoreToProduct: jest.fn(),
  findStoresFromProduct: jest.fn(),
  findStoreFromProduct: jest.fn(),
  updateStoresFromProduct: jest.fn(),
  deleteStoreFromProduct: jest.fn(),
};
jest.mock('../../auth/guards/auth.guard', () => {
  return {
    AuthGuard: jest.fn().mockReturnValue(true),
  };
});
describe('ProductStoreController', () => {
  let controller: ProductStoreController;
  let service: ProductStoreService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductStoreController],
      providers: [
        {
          provide: ProductStoreService,
          useValue: mockProductStoreService,
        },
      ],
    }).compile();

    controller = module.get<ProductStoreController>(ProductStoreController);
    service = module.get<ProductStoreService>(ProductStoreService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add store to product', async () => {
    const productId = 'some-product-id';
    const storeId = 'some-store-id';
    const expectedResult = {};

    mockProductStoreService.addStoreToProduct.mockResolvedValue(expectedResult);

    const result = await controller.addStoreToProduct(productId, storeId);

    expect(result).toEqual(expectedResult);
    expect(service.addStoreToProduct).toHaveBeenCalledWith(productId, storeId);
  });

  it('should find stores from product', async () => {
    const productId = 'some-product-id';
    const expectedResult = [];

    mockProductStoreService.findStoresFromProduct.mockResolvedValue(expectedResult);

    const result = await controller.findStoresFromProduct(productId);

    expect(result).toEqual(expectedResult);
    expect(service.findStoresFromProduct).toHaveBeenCalledWith(productId);
  });

  it('should find store from product', async () => {
    const productId = 'some-product-id';
    const storeId = 'some-store-id';
    const expectedResult = {};

    mockProductStoreService.findStoreFromProduct.mockResolvedValue(expectedResult);

    const result = await controller.findStoreFromProduct(productId, storeId);

    expect(result).toEqual(expectedResult);
    expect(service.findStoreFromProduct).toHaveBeenCalledWith(productId, storeId);
  });

  it('should update stores from product', async () => {
    const productId = 'some-product-id';
    const createProductStoreDto: CreateProductStoreDto = { storeIds: ['some-store-id'] };
    const expectedResult = {};

    mockProductStoreService.updateStoresFromProduct.mockResolvedValue(expectedResult);

    const result = await controller.updateStoresFromProduct(productId, createProductStoreDto);

    expect(result).toEqual(expectedResult);
    expect(service.updateStoresFromProduct).toHaveBeenCalledWith(productId, createProductStoreDto);
  });

  it('should delete store from product', async () => {
    const productId = 'some-product-id';
    const storeId = 'some-store-id';
    const expectedResult = {};

    mockProductStoreService.deleteStoreFromProduct.mockResolvedValue(expectedResult);

    const result = await controller.deleteStoreFromProduct(productId, storeId);

    expect(result).toEqual(expectedResult);
    expect(service.deleteStoreFromProduct).toHaveBeenCalledWith(productId, storeId);
  });
});
