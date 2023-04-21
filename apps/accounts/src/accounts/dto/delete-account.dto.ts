import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

export class DeleteAccountParamsDto {
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

export class DeleteAccountResponseDto {
  @ApiProperty({
    example: true,
    description: 'True if the account is deleted',
  })
  @Expose()
  deleted: boolean;
}
