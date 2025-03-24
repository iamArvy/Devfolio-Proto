import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET') || 'defaultSecret',
    });
  }
  validate({ sub }: { sub: string }) {
    // If you want to check if the user exists, uncomment this
    // const user = await this.userService.user({
    //   where: { id: sub },
    //   select: { ...this.userService.public },
    // });

    if (!sub) throw new UnauthorizedException('Unauthorized User'); // Ensure the sub exists
    return sub; // Return a minimal user object
  }
}
