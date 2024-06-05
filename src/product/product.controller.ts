import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { catchError } from 'rxjs';
import { CreateProductDto, PaginationDto, UpdateProductDto } from './dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    try {
      return this.productService.create(createProductDto)
    } catch (error) {
      throw  catchError(error)
    }
  }

  @Get('all')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.findOne(id);
  }

  @Patch('edit/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.productService.remove(id);
  }
}
