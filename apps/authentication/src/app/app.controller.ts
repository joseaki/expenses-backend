import { Body, Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller('authentication')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   *
   * @param createAccountDto
   * @returns
   */
  @MessagePattern({ cmd: 'verifyToken' })
  async create(@Payload() body: { token: string }) {
    console.log(body);
    const resp = await this.appService.verifyToken(body.token);
    return { data: resp };
  }

  @Post('verify')
  async verifyToken(@Body() body: { token: string }) {
    console.log(body);
    const resp = await this.appService.verifyToken(body.token);
    return { data: resp };
  }
}
