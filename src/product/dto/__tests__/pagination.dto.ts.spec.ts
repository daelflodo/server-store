import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '../pagination.dto';

describe('PaginationDto', () => {
  it('should validate with default values', async () => {
    const dto = plainToInstance(PaginationDto, {});

    const errors = await validate(dto);
    expect(errors.length).toBe(0);

    expect(dto.page).toBe(1);
    expect(dto.limit).toBe(10);
  });

  it('should validate with provided values', async () => {
    const dto = plainToInstance(PaginationDto, {
      page: 2,
      limit: 5,
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);

    expect(dto.page).toBe(2);
    expect(dto.limit).toBe(5);
  });

  it('should fail validation if page is not positive', async () => {
    const dto = plainToInstance(PaginationDto, {
      page: -1,
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);

    const errorMessages = errors.map(error => error.constraints?.isPositive);
    expect(errorMessages).toEqual(expect.arrayContaining(['page must be a positive number']));
  });

  it('should fail validation if limit is not positive', async () => {
    const dto = plainToInstance(PaginationDto, {
      limit: 0,
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);

    const errorMessages = errors.map(error => error.constraints?.isPositive);
    expect(errorMessages).toEqual(expect.arrayContaining(['limit must be a positive number']));
  });

  it('should fail validation if both page and limit are not positive', async () => {
    const dto = plainToInstance(PaginationDto, {
      page: -1,
      limit: -5,
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);

    const pageErrorMessages = errors.find(error => error.property === 'page')?.constraints?.isPositive;
    const limitErrorMessages = errors.find(error => error.property === 'limit')?.constraints?.isPositive;

    expect(pageErrorMessages).toBe('page must be a positive number');
    expect(limitErrorMessages).toBe('limit must be a positive number');
  });
});
