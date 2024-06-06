import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

import { ProductStoreService } from './product-store.service';
import { CreateProductStoreDto } from './dto/create-product-store.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('Product-Store')
@Controller('products')
export class ProductStoreController {
  constructor(private readonly productStoreService: ProductStoreService) {}

  @ApiOperation({ summary: 'Asociar una tienda a un producto' })
  @ApiParam({ name: 'productId', description: 'UUID del producto' })
  @ApiParam({ name: 'storeId', description: 'UUID de la tienda' })
  @ApiResponse({
    status: 200,
    description: 'Tienda asociada al producto correctamente',
  })
  @ApiResponse({ status: 404, description: 'Producto o tienda no encontrados' })
  @Post(':productId/store/:storeId')
  async addStoreToProduct(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Param('storeId', ParseUUIDPipe) storeId: string,
  ): Promise<any> {
    return await this.productStoreService.addStoreToProduct(productId, storeId);
  }

  @ApiOperation({ summary: 'Obtener las tiendas que tienen un producto' })
  @ApiParam({ name: 'productId', description: 'UUID del producto' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tiendas devuelta correctamente',
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @Get(':productId/stores')
  async findStoresFromProduct(
    @Param('productId', ParseUUIDPipe) productId: string,
  ): Promise<any> {
    return await this.productStoreService.findStoresFromProduct(productId);
  }

  @ApiOperation({ summary: 'Obtener una tienda que tiene un producto' })
  @ApiParam({ name: 'productId', description: 'UUID del producto' })
  @ApiParam({ name: 'storeId', description: 'UUID de la tienda' })
  @ApiResponse({ status: 200, description: 'Tienda devuelta correctamente' })
  @ApiResponse({ status: 404, description: 'Producto o tienda no encontrados' })
  @Get(':productId/stores/:storeId')
  async findStoreFromProduct(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Param('storeId', ParseUUIDPipe) storeId: string,
  ): Promise<any> {
    return await this.productStoreService.findStoreFromProduct(
      productId,
      storeId,
    );
  }

  @ApiOperation({ summary: 'Actualizar las tiendas que tienen un producto' })
  @ApiParam({ name: 'productId', description: 'UUID del producto' })
  @ApiBody({ type: CreateProductStoreDto })
  @ApiResponse({
    status: 200,
    description: 'Tiendas actualizadas correctamente',
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @Patch(':productId/stores')
  async updateStoresFromProduct(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body() createProductStoreDto: CreateProductStoreDto,
  ): Promise<any> {
    return await this.productStoreService.updateStoresFromProduct(
      productId,
      createProductStoreDto,
    );
  }

  @ApiOperation({ summary: 'Eliminar la tienda que tiene un producto' })
  @ApiParam({ name: 'productId', description: 'UUID del producto' })
  @ApiParam({ name: 'storeId', description: 'UUID de la tienda' })
  @ApiResponse({
    status: 200,
    description: 'Tienda eliminada del producto correctamente',
  })
  @ApiResponse({ status: 404, description: 'Producto o tienda no encontrados' })
  @Delete(':productId/stores/:storeId')
  async deleteStoreFromProduct(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Param('storeId', ParseUUIDPipe) storeId: string,
  ): Promise<any> {
    return await this.productStoreService.deleteStoreFromProduct(
      productId,
      storeId,
    );
  }
}
