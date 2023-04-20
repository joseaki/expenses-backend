import {
  ArgumentMetadata,
  UnprocessableEntityException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { IValidationError } from './validate-body.interface';

@Injectable()
export class ValidatePipe implements PipeTransform {
  constructor(private classTransformOptions?: ClassTransformOptions) {}

  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    if (!metatype || this.isScalarType(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
      ...this.classTransformOptions,
    });

    const errors = await validate(object, { whitelist: true });

    if (errors.length > 0) {
      throw new UnprocessableEntityException(
        errors.map<IValidationError>((error) => ({
          constraints: Object.values(error.constraints),
          codes: Object.keys(error.constraints),
          value: error.value,
          property: error.property,
          children: error.children,
        })),
        'Validation error'
      );
    }

    return object;
  }

  private isScalarType(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return types.includes(metatype);
  }
}
