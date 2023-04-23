import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsHexColor, IsISO4217CurrencyCode, IsNumber, IsString, IsUUID } from 'class-validator';
import { IAccount, IAccountCreateResponse } from '../interfaces/account.interface';

export class CreateAccountDto implements Omit<IAccount, 'uuid' | 'userId'> {
  @IsString()
  @ApiProperty({
    example: 'wallet',
    description: 'Account name',
    required: true,
  })
  @Expose()
  name: string;

  @IsNumber()
  @ApiProperty({
    example: '10.0',
    description: 'Initial amount the account starts with',
    required: true,
  })
  @Expose()
  initialValue: number;

  @IsString()
  @IsISO4217CurrencyCode()
  @ApiProperty({
    example: 'PEN',
    description: 'Account currency ISO code',
    required: true,
  })
  @Expose()
  currency: string;

  @IsString()
  @IsHexColor()
  @ApiProperty({
    example: '#a1d5ee',
    description: 'Account color reference',
    required: true,
  })
  @Expose()
  color: string;
}

export class CreateAccountResponseDto implements IAccountCreateResponse {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User uuid',
  })
  @Expose()
  id: string;
}
