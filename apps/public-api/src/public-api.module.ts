import { Module } from '@nestjs/common';
import { PublicApiController } from './public-api.controller';
import { PublicApiService } from './public-api.service';
import { AuthModule } from './auth/auth.module';
import { ClientService } from './client/client.service';

@Module({
  imports: [AuthModule],
  controllers: [PublicApiController],
  providers: [PublicApiService, ClientService],
  exports: [ClientService],
})
export class PublicApiModule {}
