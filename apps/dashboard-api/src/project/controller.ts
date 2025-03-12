import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ProjectService } from './service';
import { CreateDto, UpdateDto } from './dto';
import { GetUser } from '@app/shared/decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from '@app/shared/storage';
import { Project } from '@prisma/client';
import { GetProjectPipe } from './pipe/get-project.pipe';
import { JwtGuard } from '../auth/guard';
import { JobService } from '../job/service';

@UseGuards(JwtGuard)
@Controller('project')
export class ProjectController {
  constructor(
    private readonly service: ProjectService,
    private storage: StorageService,
    private job: JobService,
  ) {}

  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() data: CreateDto,
    @GetUser('id') userId: string,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const job = await this.job.job({ id: data.jobId });
    if (!job) throw new NotFoundException('Job not found');
    const { name, description } = data;
    return this.service.create({
      name,
      description,
      user: { connect: { id: userId } },

      image: image ? this.storage.saveToLocal(image, 'projectImages') : null,

      job: {
        connect: { id: job.id },
      },

      stack: {
        connectOrCreate: (data.stack || []).map((stack) => ({
          where: { name_userId: { name: stack, userId } },
          create: { name: stack, userId, jobId: job.id },
        })),
      },
    });
  }

  @Get('')
  userProjects(@GetUser('id') userId: string) {
    return this.service.projects({
      where: { userId: userId },
    });
  }

  @Get(':id')
  userProject(
    @Param('id', GetProjectPipe) project: Project,
    @GetUser('id') userId: string,
  ) {
    return this.service.project({ id: project.id, userId });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', GetProjectPipe) project: Project,
    @Body() data: UpdateDto,
    @GetUser('id') userId: string,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.service.update({
      where: { id: project.id, userId },
      data: {
        ...data,

        image: image
          ? this.storage.saveToLocal(image, 'projectImages')
          : undefined,

        stack: data.stack
          ? {
              set: [],
              connectOrCreate: (data.stack || []).map((stack) => ({
                where: { name_userId: { name: stack, userId } },
                create: { name: stack, userId, jobId: data.jobId },
              })),
            }
          : undefined,

        job: data.jobId ? { connect: { id: data.jobId } } : undefined,
      },
    });
  }

  @Delete(':id')
  async remove(
    @Param('id', GetProjectPipe) project: Project,
    @GetUser('id') userId: string,
  ) {
    if (project.image) await this.storage.deleteFromLocal(project.image);
    return this.service.delete({ id: project.id, userId });
  }
}
