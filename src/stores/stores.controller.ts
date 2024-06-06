import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto, UpdateStoreDto } from './dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @ApiOperation({ summary: 'Crear una nueva tienda' })
  @ApiCreatedResponse({ description: 'La tienda ha sido creado exitosamente' })
  @ApiBadRequestResponse({ description: 'Los datos proporcionados son inválidos' })
  @Post('create')
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @ApiOperation({ summary: 'Obtener todas las tiendas' })
  @Get('all')
  findAll() {
    return this.storesService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una tienda por su ID' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.storesService.findOne(id);
  }
  
  @ApiOperation({ summary: 'Actualizar una tienda existente' })
  @Patch('edit/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    return this.storesService.update(id, updateStoreDto);
  }
  
  @ApiOperation({ summary: 'Eliminar una tienda por su ID' })
  @Delete('delete/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.storesService.remove(id);
  }
}
