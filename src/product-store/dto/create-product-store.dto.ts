import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';

export class CreateProductStoreDto {
  @ApiProperty({
    description: 'Array of store UUIDs',
    type: [String],
    example: [
      'a8098c1a-f86e-11da-bd1a-00112444be1e',
      'a8098c1a-f86e-11da-bd1a-00112444be1f',
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsUUID('4', { each: true })
  storeIds: string[];
}
