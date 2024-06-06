import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { CreateProductDto, PaginationDto, UpdateProductDto } from './dto';
import { ProductService } from './product.service';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiCreatedResponse({
    description: 'El producto ha sido creado exitosamente',
  })
  @ApiBadRequestResponse({
    description: 'Los datos proporcionados son inválidos',
  })
  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Obtener todos los productos con paginación' })
  @ApiOkResponse({ description: 'Productos obtenidos exitosamente' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número de página',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Cantidad de elementos por página',
    example: 3,
  })
  @Get('all')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productService.findAll(paginationDto);
  }

  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  @ApiOkResponse({ description: 'Producto obtenido exitosamente' })
  @ApiParam({ name: 'id', description: 'UUID del producto' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar un producto existente' })
  @ApiOkResponse({ description: 'Producto actualizado exitosamente' })
  @ApiParam({ name: 'id', description: 'UUID del producto' })
  @Patch('edit/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Eliminar un producto por su ID' })
  @ApiOkResponse({ description: 'Producto eliminado exitosamente' })
  @ApiParam({ name: 'id', description: 'UUID del producto' })
  @Delete('delete/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.remove(id);
  }
}
