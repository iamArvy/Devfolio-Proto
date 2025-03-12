import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './service';
import { CreateDto, UpdateDto } from './dto';
import { GetUser } from '@app/shared/decorator';
import { JwtGuard } from '../auth/guard';
import { GetJobPipe } from './pipe';
import { Job } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('job')
export class JobController {
  constructor(private readonly service: JobService) {}
  @Post('')
  async create(@Body() data: CreateDto, @GetUser('id') userId: string) {
    // const { role, description, value } = data;
    return this.service.create({
      ...data,
      user: { connect: { id: userId } },
    });
  }

  @Get('')
  userJobs(@GetUser('id') userId: string) {
    return this.service.jobs({
      where: { userId: userId },
    });
  }

  @Get(':id')
  userJob(@Param('id', GetJobPipe) job: Job, @GetUser('id') userId: string) {
    return this.service.job({ id: job.id, userId });
  }

  @Patch(':id')
  async update(
    @Param('id', GetJobPipe) job: Job,
    @Body() updateProjectDto: UpdateDto,
    @GetUser('id') userId: string,
  ) {
    return await this.service.update({
      where: { id: job.id, userId },
      data: {
        ...updateProjectDto,
      },
    });
  }

  @Delete(':id')
  async remove(
    @Param('id', GetJobPipe) job: Job,
    @GetUser('id') userId: string,
  ) {
    return this.service.delete({ id: job.id, userId });
  }
}
