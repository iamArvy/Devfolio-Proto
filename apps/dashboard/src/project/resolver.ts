import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ProjectService } from './service';
import { CreateProjectDto, UpdateProjectDto } from './dto';
import { Project } from './entity';
import { NotFoundException, UploadedFile, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@app/shared/guards';
import { JobService } from '../job';
import { StorageService } from '@app/shared/storage';

@UseGuards(GqlAuthGuard)
@Resolver(() => Project)
export class ProjectResolver {
  constructor(
    private readonly service: ProjectService,
    private storage: StorageService,
    private job: JobService,
  ) {}

  @Mutation(() => Project, { name: 'createProject' })
  async create(
    @Context('req') req: { user: string },
    @Args('data') data: CreateProjectDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const job = await this.job.job({ id: data.jobId });
    if (!job) throw new NotFoundException('Job not found');
    const { name, description } = data;
    return this.service.create({
      name,
      description,
      user: { connect: { id: req.user } },

      image: image ? this.storage.saveToLocal(image, 'projectImages') : null,

      job: {
        connect: { id: job.id },
      },

      stack: {
        connectOrCreate: (data.stack || []).map((stack) => ({
          where: { name_userId: { name: stack, userId: req.user } },
          create: { name: stack, userId: req.user, jobId: job.id },
        })),
      },
    });
  }

  @Query(() => [Project], { name: 'getProjects' })
  projects(@Context('req') req: { user: string }) {
    return this.service.projects({ where: { userId: req.user } });
  }

  @Query(() => Project, { name: 'getProject', nullable: true })
  project(
    @Context('req') req: { user: string },
    @Args('id', { type: () => String }) id: number,
  ) {
    return this.service.project({
      id: id,
      userId: req.user,
    });
  }

  @Mutation(() => Project, { name: 'updateProject' })
  updateProject(
    @Context('req') req: { user: string },
    @Args('id') id: number,
    @Args('data') data: UpdateProjectDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.service.update({
      where: { id: id, userId: req.user },
      data: {
        ...data,

        image: image
          ? this.storage.saveToLocal(image, 'projectImages')
          : undefined,

        stack: data.stack
          ? {
              set: [],
              connectOrCreate: (data.stack || []).map((stack) => ({
                where: { name_userId: { name: stack, userId: req.user } },
                create: { name: stack, userId: req.user, jobId: data.jobId },
              })),
            }
          : undefined,

        job: data.jobId ? { connect: { id: data.jobId } } : undefined,
      },
    });
  }

  @Mutation(() => Project, { name: 'deleteProject' })
  async deleteProject(
    @Context('req') req: { user: string },
    @Args('id', { type: () => String }) id: number,
  ) {
    const project = await this.service.project({
      id: id,
      userId: req.user,
    });

    if (project && project.image)
      await this.storage.deleteFromLocal(project.image);
    return this.service.delete({
      id: id,
      userId: req.user,
    });
  }
}
