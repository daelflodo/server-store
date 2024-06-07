import { Test, TestingModule } from '@nestjs/testing';
import { StoresController } from '../stores.controller';
import { StoresService } from '../stores.service';
import { CreateStoreDto, UpdateStoreDto } from '../dto';
import { AuthGuard } from '../../auth/guards/auth.guard';

const mockStoresService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('StoresController', () => {
  let controller: StoresController;
  let service: StoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoresController],
      providers: [
        {
          provide: StoresService,
          useValue: mockStoresService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<StoresController>(StoresController);
    service = module.get<StoresService>(StoresService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
        expect(controller.create).toBeDefined();
      });

    it('should create a new store', async () => {
      const createStoreDto: CreateStoreDto = { name: 'New Store',city:'BOG',address:'Calle 72 #10-34, Chapinero' };
      const createdStore = { id: '1', ...createStoreDto };

      mockStoresService.create.mockResolvedValue(createdStore);

      expect(await controller.create(createStoreDto)).toEqual(createdStore);
      expect(mockStoresService.create).toHaveBeenCalledWith(createStoreDto);
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
        expect(controller.findAll).toBeDefined();
      });

    it('should return all stores', async () => {
      const stores = [{ id: '1', name: 'Store 1' }, { id: '2', name: 'Store 2' }];

      mockStoresService.findAll.mockResolvedValue(stores);

      expect(await controller.findAll()).toEqual(stores);
      expect(mockStoresService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
        expect(controller.findOne).toBeDefined();
      });

    it('should return a store by ID', async () => {
      const store = { id: '1', name: 'Store 1' };

      mockStoresService.findOne.mockResolvedValue(store);

      expect(await controller.findOne('1')).toEqual(store);
      expect(mockStoresService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should be defined', () => {
        expect(controller.update).toBeDefined();
      });

    it('should update an existing store', async () => {
      const updateStoreDto: UpdateStoreDto = { name: 'Updated Store' };
      const updatedStore = { id: '1', ...updateStoreDto };

      mockStoresService.update.mockResolvedValue(updatedStore);

      expect(await controller.update('1', updateStoreDto)).toEqual(updatedStore);
      expect(mockStoresService.update).toHaveBeenCalledWith('1', updateStoreDto);
    });
  });

  describe('remove', () => {
    it('should be defined', () => {
        expect(controller.remove).toBeDefined();
      });

    it('should remove a store by ID', async () => {
      const response = { message: 'The store was successfully removed' };

      mockStoresService.remove.mockResolvedValue(response);

      expect(await controller.remove('1')).toEqual(response);
      expect(mockStoresService.remove).toHaveBeenCalledWith('1');
    });
  });
});
