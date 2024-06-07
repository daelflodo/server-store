// create-product-store.dto.spec.ts
import { validate } from 'class-validator';
import { CreateProductStoreDto } from '../create-product-store.dto';

describe('CreateProductStoreDto', () => {
  
  it('should validate successfully with correct input', async () => {
    const dto = new CreateProductStoreDto();
    dto.storeIds = ['9b1deb4d-b46a-4b95-9d33-2a71b8b2c4a5'];

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation with incorrect input', async () => {
    const dto = new CreateProductStoreDto();
    dto.storeIds = ['invalid-uuid'];

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation if storeIds is empty', async () => {
    const dto = new CreateProductStoreDto();
    dto.storeIds = [];

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
