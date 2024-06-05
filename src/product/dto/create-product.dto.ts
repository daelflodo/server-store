import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsPositive, IsString, IsUrl } from 'class-validator';
import { ProductType, ProductTypeList } from 'src/common';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  price: number;
  
  @IsNotEmpty()
  @IsString()
  @IsEnum(ProductType,{
    message: `valid types are ${ProductTypeList}`
  })
  type: ProductType;

  // @ApiProperty()
  @IsOptional()
  @IsString()
  @IsUrl()
  image?: string;
}
