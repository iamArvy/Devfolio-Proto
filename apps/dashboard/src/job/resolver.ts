import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { JobService } from './service';
import { CreateJobDto, UpdateJobDto } from './dto';
import { Job } from './entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@app/shared/guards';

@UseGuards(GqlAuthGuard)
@Resolver(() => Job)
export class JobResolver {
  constructor(private readonly service: JobService) {}

  @Mutation(() => Job, { name: 'createJob' })
  create(
    @Context('req') req: { user: string },
    @Args('data') data: CreateJobDto,
  ) {
    return this.service.create({
      ...data,
      user: { connect: { id: req.user } },
    });
  }

  @Query(() => [Job], { name: 'getJobs' })
  jobs(@Context('req') req: { user: string }) {
    return this.service.jobs({ where: { userId: req.user } });
  }

  @Query(() => Job, { name: 'getJob', nullable: true })
  job(
    @Context('req') req: { user: string },
    @Args('id', { type: () => String }) id: number,
  ) {
    return this.service.job({
      id: id,
      userId: req.user,
    });
  }

  @Mutation(() => Job, { name: 'updateJob' })
  updateJob(
    @Context('req') req: { user: string },
    @Args('id') id: number,
    @Args('data') data: UpdateJobDto,
  ) {
    return this.service.update({
      where: {
        id: id,
        userId: req.user,
      },
      data: {
        ...data,
      },
    });
  }

  @Mutation(() => Job, { name: 'deleteJob' })
  deleteJob(
    @Context('req') req: { user: string },
    @Args('id', { type: () => String }) id: number,
  ) {
    return this.service.delete({
      id: id,
      userId: req.user,
    });
  }
}
