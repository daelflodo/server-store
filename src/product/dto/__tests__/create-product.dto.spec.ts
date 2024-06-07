import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateProductDto } from '../create-product.dto';
import { ProductType } from '../../../common';

describe('CreateProductDto', () => {
  it('should validate a correct DTO', async () => {
    const dto = plainToInstance(CreateProductDto, {
      name: 'Carne de res',
      price: 15.95,
      type: ProductType.Perecedero,
      image: 'https://example.com/product-image.jpg',
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation if required fields are missing', async () => {
    const dto = plainToInstance(CreateProductDto, {});

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);

    const names = errors.map(error => error.property);
    expect(names).toEqual(expect.arrayContaining(['name', 'price', 'type']));
  });

  it('should fail validation if price is not positive', async () => {
    const dto = plainToInstance(CreateProductDto, {
      name: 'Carne de res',
      price: -5,
      type: ProductType.Perecedero,
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);

    const errorMessages = errors.map(error => error.constraints?.isPositive);
    expect(errorMessages).toEqual(expect.arrayContaining(['price must be a positive number']));
  });

  //!descripcion 
  describe('Generado',()=>{
    it('should fail validation if type is invalid', async () => {
        const dto = plainToInstance(CreateProductDto, {
          name: 'Carne de res',
          price: 15.95,
          type: 'InvalidType',
        });
    
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    
        const errorMessages = errors.map(error => error.constraints?.isEnum);
        const expectedMessage = `valid types are ${Object.values(ProductType).sort().join(',')}`;
    
        // Normalize the order of product types in the received message
        const receivedMessage = errorMessages.find(msg => msg?.includes('valid types are')) ?? '';
        const receivedTypes = receivedMessage.split('valid types are ')[1]?.split(', ').sort() ?? [];
    
        expect(receivedTypes.join(', ')).toBe(expectedMessage.split('valid types are ')[1]);
      });
  })

  it('should fail validation if image is not a valid URL', async () => {
    const dto = plainToInstance(CreateProductDto, {
      name: 'Carne de res',
      price: 15.95,
      type: ProductType.Perecedero,
      image: 'invalid-url',
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);

    const errorMessages = errors.map(error => error.constraints?.isUrl);
    expect(errorMessages).toEqual(expect.arrayContaining(['image must be a URL address']));
  });

  it('should allow DTO without image', async () => {
    const dto = plainToInstance(CreateProductDto, {
      name: 'Carne de res',
      price: 15.95,
      type: ProductType.Perecedero,
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
