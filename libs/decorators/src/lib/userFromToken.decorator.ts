import { createParamDecorator } from '@nestjs/common';
import { IUserFromToken } from './userFromToken.interface';

export const UserFromToken = createParamDecorator((data, context): IUserFromToken => {
  const ctx = context.switchToHttp();
  const req = ctx.getRequest();
  const authorizationHeader = req.headers.authorization;
  const [, token] = authorizationHeader.split(' ');
  const [, content] = token.split('.');
  const decodedToken = Buffer.from(content, 'base64').toString();
  const tokenObject = JSON.parse(decodedToken);
  return { userId: tokenObject.user_id };
});
