import { UserService } from '@app/shared/user';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET') || 'defaultSecret',
    });
  }
  async validate(payload: { sub: string; email: string }) {
    const user = await this.userService.user({
      where: { id: payload.sub },
      select: { ...this.userService.public },
    });
    if (!user) throw new UnauthorizedException('Unauthorized User');
    return user;
  }
}
