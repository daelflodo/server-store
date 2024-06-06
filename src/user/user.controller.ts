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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'El usuario ha sido creado exitosamente',
  })
  @Post('create')
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios devuelta exitosamente',
  })
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario devuelto exitosamente' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @Get(':id')
  @ApiParam({ name: 'id', description: 'UUID del usuario', type: String })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar un usuario existente' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @Patch('edit/:id')
  @ApiParam({ name: 'id', description: 'UUID del usuario', type: String })
  @ApiBody({ type: UpdateUserDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Eliminar un usuario por su ID' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @Delete('delete/:id')
  @ApiParam({ name: 'id', description: 'UUID del usuario', type: String })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
