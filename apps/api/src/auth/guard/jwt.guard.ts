// import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { User } from '@prisma/client';

class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
  // canActivate(context: ExecutionContext) {
  //   return super.canActivate(context);
  // }

  // handleRequest(err, user: any) {
  //   if (err || !user) {
  //     throw err || new UnauthorizedException();
  //   }
  //   return user;
  // }
}

export { JwtGuard };
