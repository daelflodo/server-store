import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';
import { url } from 'inspector';
import { ProductType, ProductTypeList } from 'src/common';

export class CreateProductDto {
  @ApiProperty({
    description: 'El nombre del producto',
    example: 'Carne de res',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'El precio del producto',
    example: '15.95',
  })
  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  price: number;

  @ApiProperty({
    description: `El tipo del producto. Los tipos válidos son ${ProductTypeList}`,
    example: ProductType.Perecedero,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(ProductType, {
    message: `valid types are ${ProductTypeList}`,
  })
  type: ProductType;

  @ApiProperty({
    description: 'URL opcional de la imagen del producto',
    example: 'https://example.com/product-image.jpg',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  image?: string;
}
