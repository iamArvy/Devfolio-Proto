import { ProfileService } from './profile.service';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CreateProfileDto, UpdateProfileDto } from './dto';
import { Profile } from './entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@app/shared/guards';

@UseGuards(GqlAuthGuard)
@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly service: ProfileService) {}

  @Mutation(() => Profile, { name: 'createProfile' })
  create(
    @Context('req') req: { user: string },
    @Args('data') data: CreateProfileDto,
  ) {
    return this.service.create({
      ...data,
      user: { connect: { id: req.user } },
    });
  }

  @Query(() => Profile, { name: 'getProfile', nullable: true })
  profile(@Context('req') req: { user: string }) {
    return this.service.profile({
      userId: req.user,
    });
  }

  @Mutation(() => Profile, { name: 'updateProfile' })
  updateProfile(
    @Context('req') req: { user: string },
    @Args('data') data: UpdateProfileDto,
  ) {
    return this.service.update({
      where: {
        userId: req.user,
      },
      data: {
        ...data,
      },
    });
  }

  @Mutation(() => Profile, { name: 'deleteProfile' })
  deleteProfile(
    @Context('req') req: { user: string },
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.service.delete({
      id: id,
      userId: req.user,
    });
  }
}
