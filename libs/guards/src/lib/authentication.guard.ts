import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return false;
    const [_, token] = authorizationHeader.split(' ');
    const pattern = { cmd: 'verifyToken' };
    const payload = { token };
    const value = await lastValueFrom(this.client.send(pattern, payload));
    if (value.data.authenticated) {
      return true;
    }
    return false;
  }
}
