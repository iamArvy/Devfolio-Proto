import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthService } from '../auth.service';
// import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/shared';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@app/shared/strategies';

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PrismaModule,
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtStrategy],
})
export class UserModule {}
