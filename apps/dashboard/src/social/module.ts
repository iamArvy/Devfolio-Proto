import { Module } from '@nestjs/common';
import { SocialService } from './service';
import { SocialResolver } from './resolver';
@Module({
  providers: [SocialService, SocialResolver],
})
export class SocialModule {}
