import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    const user: User = request.user as User;
    if (!user) throw new UnauthorizedException('Unauthorized User');

    if (data && user) {
      return user[data as keyof User];
    }
    return user;
  },
);
