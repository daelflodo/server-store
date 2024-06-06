import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    example: 'daelflodo@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '#Asd1234',
    description:
      'Mayúscula, minúscula, número, carácter especial, 8 caracteres mínimo y 16 máximo',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
