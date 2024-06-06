import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateStoreDto {
  @ApiProperty({
    description:'Nombre de la tienda',
    example:'Plaza Mall'
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description:'la ciudad de la tienda sea un codigo de tres caracteres',
    example: 'BOG'
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 3, { message: 'City must be exactly 3 characters long' })
  @Matches(/^[A-Za-z]+$/, { message: 'City must contain only letters' })
  city: string;

  @ApiProperty({
    description: 'Direcion de la tienda',
    example: 'Calle 72 #10-34, Chapinero'
  })
  @IsNotEmpty()
  @IsString()
  address: string;
}
