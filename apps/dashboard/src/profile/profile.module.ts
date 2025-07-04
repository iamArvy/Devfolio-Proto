import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './resolver';

@Module({
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
