import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from '../product.service';
import { Product } from '../entities/product.entity';
import { CreateProductDto, PaginationDto, UpdateProductDto } from '../dto';
import { IProduct } from '../../common/interfaces/product.interface';
import { ProductType, ProductTypeList } from '../../common';

describe('ProductService', () => {
  let service: ProductService;
  let repository: Repository<Product>;

  const mockProductRepository = {
    save: jest.fn(),
    count: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const exampleProduct: IProduct = {
    id: '1',
    name: 'Test product',
    price: 10,
    type: ProductType.Perecedero,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
        expect(service.create).toBeDefined();
      });
    it('should create a new product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test product',
        price: 10,
        type: ProductType.Perecedero,
      };

      mockProductRepository.save.mockResolvedValue(exampleProduct);
      expect(await service.create(createProductDto)).toEqual(exampleProduct);
      expect(mockProductRepository.save).toHaveBeenCalledWith(createProductDto);
    });

    it('should throw an error if product type is invalid', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test product',
        price: 10,
        type: 'InvalidType' as ProductType,
      };

      await expect(service.create(createProductDto)).rejects.toThrow(
        `The type of product must be ${ProductTypeList}`
      );
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
        expect(service.findAll).toBeDefined();
      });
    it('should return paginated products', async () => {
      const paginationDto: PaginationDto = {
        page: 1,
        limit: 10,
      };

      mockProductRepository.count.mockResolvedValue(1);
      mockProductRepository.find.mockResolvedValue([exampleProduct]);

      expect(await service.findAll(paginationDto)).toEqual({
        data: [exampleProduct],
        meta: {
          total: 1,
          page: 1,
          lastPage: 1,
        },
      });

      expect(mockProductRepository.count).toHaveBeenCalled();
      expect(mockProductRepository.find).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
        expect(service.findOne).toBeDefined();
      });
    it('should return a product by ID', async () => {
      mockProductRepository.findOne.mockResolvedValue(exampleProduct);

      expect(await service.findOne('1')).toEqual(exampleProduct);
      expect(mockProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw an error if product not found', async () => {
      mockProductRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow('Product not Found');
    });
  });

  describe('update', () => {
    it('should be defined', () => {
        expect(service.update).toBeDefined();
      });
    it('should update an existing product', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated product',
        price: 20,
        type: ProductType.NoPerecedero,
      };

      mockProductRepository.findOne.mockResolvedValueOnce(exampleProduct);
      mockProductRepository.update.mockResolvedValueOnce({ affected: 1 });
      mockProductRepository.findOne.mockResolvedValueOnce({
        ...exampleProduct,
        ...updateProductDto,
      });

      expect(await service.update('1', updateProductDto)).toEqual({
        ...exampleProduct,
        ...updateProductDto,
      });

      expect(mockProductRepository.update).toHaveBeenCalledWith('1', updateProductDto);
    });

    it('should throw an error if product type is invalid', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated product',
        price: 20,
        type: 'InvalidType' as ProductType,
      };

      await expect(service.update('1', updateProductDto)).rejects.toThrow(
        `The type of product must be ${ProductTypeList}`
      );
    });
  });

  describe('remove', () => {
    it('should be defined', () => {
        expect(service.remove).toBeDefined();
      });
    it('should remove a product by ID', async () => {
      mockProductRepository.findOne.mockResolvedValue(exampleProduct);
      mockProductRepository.delete.mockResolvedValue({ affected: 1 });

      expect(await service.remove('1')).toEqual({
        message: 'The product was successfully removed',
        code: 'OK_PRODUCT_DELETE',
      });

      expect(mockProductRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw an error if product not found', async () => {
      mockProductRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('1')).rejects.toThrow('Product not Found');
    });
  });
});
