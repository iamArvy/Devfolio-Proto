import { Module } from '@nestjs/common';
import { SocialService } from './service';
import { SocialController } from './controller';
@Module({
  controllers: [SocialController],
  providers: [SocialService],
})
export class SocialModule {}
