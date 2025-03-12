import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectService } from '../service';

@Injectable()
export class GetProjectPipe implements PipeTransform {
  constructor(private readonly service: ProjectService) {}

  async transform(id: string) {
    const nid = parseInt(id);
    const project = await this.service.project({ id: nid });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }
}
