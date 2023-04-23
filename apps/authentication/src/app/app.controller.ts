import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ValidatePipe } from '@expenses/pipes';
import { TransformResponseInterceptor, ServiceResponseToDto } from '@expenses/interceptors';
import { CommonCreateResponse } from '@expenses/dto';

import { AppService } from './app.service';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { VerifyTokenDto, VerifyTokenResponseDto } from './dto/authentication.dto';

@Controller()
@ApiTags('Authentication')
@ApiExtraModels(VerifyTokenResponseDto)
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   *
   * @param createAccountDto
   * @returns
   */
  @MessagePattern({ cmd: 'verifyToken' })
  async create(@Payload(new ValidatePipe()) body: VerifyTokenDto) {
    const resp = await this.appService.verifyToken(body.token);
    return { data: resp };
  }

  @Post('verify')
  @CommonCreateResponse(VerifyTokenResponseDto)
  @UseInterceptors(new ServiceResponseToDto(VerifyTokenResponseDto))
  @UseInterceptors(TransformResponseInterceptor)
  async verifyToken(@Body(new ValidatePipe()) body: VerifyTokenDto) {
    return this.appService.verifyToken(body.token);
  }
}
