import { ApiProperty } from '@nestjs/swagger';
import { CreateAccountDto } from './create-account.dto';
import { IsHexColor, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateAccountDto implements Partial<Pick<CreateAccountDto, 'name' | 'color' | 'initialValue'>> {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'wallet',
    description: 'Account name',
    required: true,
  })
  @Expose()
  name: string;

  @IsOptional()
  @IsString()
  @IsHexColor()
  @ApiProperty({
    example: '#a1d5ee',
    description: 'Account color reference',
    required: true,
  })
  @Expose()
  color: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: '10.0',
    description: 'Initial amount the account starts with',
    required: true,
  })
  @Expose()
  initialValue: number;
}

export class UpdateAccountParamsDto {
  @IsString()
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Account id',
    required: true,
  })
  @Expose()
  accountId: string;
}

export class UpdateAccountResponseDto extends UpdateAccountDto {}
