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
import { ProductService } from './product.service';
import { catchError } from 'rxjs';
import { CreateProductDto, PaginationDto, UpdateProductDto } from './dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiCreatedResponse({ description: 'El producto ha sido creado exitosamente' })
  @ApiBadRequestResponse({ description: 'Los datos proporcionados son inválidos' })
  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    try {
      return this.productService.create(createProductDto);
    } catch (error) {
      throw catchError(error);
    }
  }
  
  @ApiOperation({ summary: 'Obtener todos los productos con paginación' })
  @Get('all')
  @ApiQuery({ name: 'page', required: false, description: 'Número de página', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Cantidad de elementos por página', example: 3 })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productService.findAll(paginationDto);
  }
  
  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.findOne(id);
  }
  
  @ApiOperation({ summary: 'Actualizar un producto existente' })
  @Patch('edit/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }
  
  @ApiOperation({ summary: 'Eliminar un producto por su ID' })
  @Delete('delete/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.remove(id);
  }
}
