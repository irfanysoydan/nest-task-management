import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest(); // Bu decoratorun amacı request içerisindeki user bilgisini almak.
    return req.user;
  },
);
