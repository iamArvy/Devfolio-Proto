import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { JobService } from '..';

@Injectable()
export class GetJobPipe implements PipeTransform {
  constructor(private readonly service: JobService) {}

  async transform(id: number) {
    const job = await this.service.job({ id });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return job;
  }
}
