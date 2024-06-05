import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { IProduct } from 'src/common/interfaces/product.interface';
import { ProductTypeList, createCustomException } from 'src/common';
import { CreateProductDto, PaginationDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<IProduct> {
    if (!ProductTypeList.includes(createProductDto.type)) {
      throw createCustomException(
        `The type of product must be ${ProductTypeList}`,
        400,
        'Product',
      );
    }
    return await this.productRepository.save(createProductDto);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPage = await this.productRepository.count();
    const lastPage = Math.ceil(totalPage / limit);
    return {
      data: await this.productRepository.find({
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        total: totalPage,
        page,
        lastPage,
      },
    };
  }

  async findOne(id: string) {
    console.log(id);

    const product = await this.productRepository.findOne({
      where: { id },
    });
    console.log(product);

    if (!product) createCustomException('Product not Found', 404, 'Product');
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<IProduct> {
    if (!ProductTypeList.includes(updateProductDto.type)) {
      throw createCustomException(
        `The type of product must be ${ProductTypeList}`,
        400,
        'Product',
      );
    }
    await this.findOne(id);
    await this.productRepository.update(id, updateProductDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.productRepository.delete(id);

    return {
      message: 'The product was successfully removed',
      // data: user,
      code: 'OK_PRODUCT_DELETE',
    };
  }
}
