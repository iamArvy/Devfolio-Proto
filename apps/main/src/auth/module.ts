import { UserModule } from '../../../../libs/shared/src/user/module';
import { Module } from '@nestjs/common';
import { AuthService } from './service';
import { AuthController } from './controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
// import { ClientModule } from 'src/client/client.module';
// import { jwtConstants } from './constants';
// import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    // ClientModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
