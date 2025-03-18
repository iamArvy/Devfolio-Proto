import { Module } from '@nestjs/common';
import { ProjectService } from './service';
import { ProjectController } from './controller';
import { MulterModule } from '@nestjs/platform-express';
import { JobModule } from '../job/module';
// import * as multer from 'multer';

@Module({
  imports: [MulterModule.register(), JobModule],
  controllers: [ProjectController],
  providers: [ProjectService, JobModule],
})
export class ProjectModule {}
