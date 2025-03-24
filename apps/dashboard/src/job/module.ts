import { Module } from '@nestjs/common';
import { JobService } from './service';
import { JobResolver } from './resolver';

@Module({
  providers: [JobService, JobResolver],
  exports: [JobService],
})
export class JobModule {}
