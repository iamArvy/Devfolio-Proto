import { Module } from '@nestjs/common';
import { PortfolioController, PortfolioService } from './portfolio';
import { AuthModule } from './auth/module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/shared';
import { UserModule } from '@app/shared/user';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService, UserModule],
})
export class PublicApiModule {}
