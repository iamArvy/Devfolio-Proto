import { Module } from '@nestjs/common';
import { ProjectService } from './service';
import { MulterModule } from '@nestjs/platform-express';
import { JobModule } from '../job/module';
import { ProjectResolver } from './resolver';
// import * as multer from 'multer';

@Module({
  imports: [MulterModule.register(), JobModule],
  providers: [ProjectService, JobModule, ProjectResolver],
})
export class ProjectModule {}
