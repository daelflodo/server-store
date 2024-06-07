import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { CreateProductDto, PaginationDto, UpdateProductDto } from '../dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { ProductType } from '../../common';

const mockProductService = {
  create: jest.fn((dto) => {
    return { id: '1', ...dto };
  }),
  findAll: jest.fn(() => {
    return [{ id: '1', name: 'Test product', price: 10, type: 'Perecedero' }];
  }),
  findOne: jest.fn((id) => {
    return { id, name: 'Test product', price: 10, type: 'Perecedero' };
  }),
  update: jest.fn((id, dto) => {
    return { id, ...dto };
  }),
  remove: jest.fn((id) => {
    return { id, deleted: true };
  }),
};
jest.mock('../../auth/guards/auth.guard', () => {
    return {
      AuthGuard: jest.fn().mockReturnValue(true),
    };
  });
describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    })

      .compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    it('should create a product', async () => {
      const dto: CreateProductDto = {
        name: 'Test product',
        price: 10,
        type: ProductType.Perecedero,
      };

      expect(await controller.create(dto)).toEqual({
        id: '1',
        ...dto,
      });

      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });

    it('should find all products with pagination', async () => {
      const paginationDto: PaginationDto = {
        page: 1,
        limit: 10,
      };

      expect(await controller.findAll(paginationDto)).toEqual([
        { id: '1', name: 'Test product', price: 10, type: 'Perecedero' },
      ]);

      expect(service.findAll).toHaveBeenCalledWith(paginationDto);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });
    it('should find one product by id', async () => {
      const id = '1';

      expect(await controller.findOne(id)).toEqual({
        id,
        name: 'Test product',
        price: 10,
        type: 'Perecedero',
      });

      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });

    it('should update a product', async () => {
      const id = '1';
      const dto: UpdateProductDto = {
        name: 'Updated product',
        price: 20,
        type: ProductType.Perecedero,
      };

      expect(await controller.update(id, dto)).toEqual({
        id,
        ...dto,
      });

      expect(service.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should be defined', () => {
      expect(controller.remove).toBeDefined();
    });

    it('should delete a product', async () => {
      const id = '1';

      expect(await controller.remove(id)).toEqual({
        id,
        deleted: true,
      });

      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
