import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { StackService } from './service';
import { CreateStackDto, UpdateStackDto } from './dto';
import { Stack } from './entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@app/shared/guards';

@UseGuards(GqlAuthGuard)
@Resolver(() => Stack)
export class StackResolver {
  constructor(private readonly service: StackService) {}

  @Mutation(() => Stack, { name: 'createStack' })
  create(
    @Context('req') req: { user: string },
    @Args('data') data: CreateStackDto,
  ) {
    return this.service.create({
      ...data,
      user: { connect: { id: req.user } },
      job: { connect: { id: data.jobId } },
    });
  }

  @Query(() => [Stack], { name: 'getStacks' })
  stacks(@Context('req') req: { user: string }) {
    return this.service.stacks({ where: { userId: req.user } });
  }

  @Query(() => Stack, { name: 'getStack', nullable: true })
  stack(
    @Context('req') req: { user: string },
    @Args('id', { type: () => String }) id: number,
  ) {
    return this.service.stack({
      id: id,
      userId: req.user,
    });
  }

  @Mutation(() => Stack, { name: 'updateStack' })
  updateStack(
    @Context('req') req: { user: string },
    @Args('id') id: number,
    @Args('data') data: UpdateStackDto,
  ) {
    return this.service.update({
      where: {
        id: id,
        userId: req.user,
      },
      data: {
        ...data,
        job: { connect: { id: data.jobId } },
      },
    });
  }

  @Mutation(() => Stack, { name: 'deleteStack' })
  deleteStack(
    @Context('req') req: { user: string },
    @Args('id', { type: () => String }) id: number,
  ) {
    return this.service.delete({
      id: id,
      userId: req.user,
    });
  }
}
