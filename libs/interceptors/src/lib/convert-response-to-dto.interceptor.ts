import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs/operators';

@Injectable()
export class ServiceResponseToDto implements NestInterceptor {
  constructor(private DTOClass: any) {}
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        return plainToInstance(this.DTOClass, data, {
          excludeExtraneousValues: true,
        });
      })
    );
  }
}
