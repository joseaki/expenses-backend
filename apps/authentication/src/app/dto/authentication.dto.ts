import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsJWT, IsString } from 'class-validator';

export class VerifyTokenDto {
  @IsString()
  @IsJWT()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'authentication token',
    required: true,
  })
  @Expose()
  token: string;
}

export class VerifyTokenResponseDto {
  @ApiProperty({
    example: true,
    description: 'true if token is valid',
  })
  @Expose()
  authenticated: boolean;
}
