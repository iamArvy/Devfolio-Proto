import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { SocialService } from './service';
import { CreateSocialDto, UpdateSocialDto } from './dto';
import { Social } from './entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@app/shared/guards';

@UseGuards(GqlAuthGuard)
@Resolver(() => Social)
export class SocialResolver {
  constructor(private readonly service: SocialService) {}

  @Mutation(() => Social, { name: 'createSocial' })
  create(
    @Context('req') req: { user: string },
    @Args('data') data: CreateSocialDto,
  ) {
    return this.service.create({
      ...data,
      user: { connect: { id: req.user } },
    });
  }

  @Query(() => [Social], { name: 'getSocials' })
  contacts(@Context('req') req: { user: string }) {
    return this.service.socials({ where: { userId: req.user } });
  }

  @Query(() => Social, { name: 'getSocial', nullable: true })
  contact(
    @Context('req') req: { user: string },
    @Args('id', { type: () => String }) id: number,
  ) {
    return this.service.social({
      id: id,
      userId: req.user,
    });
  }

  @Mutation(() => Social, { name: 'updateSocial' })
  updateSocial(
    @Context('req') req: { user: string },
    @Args('id') id: number,
    @Args('data') data: UpdateSocialDto,
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

  @Mutation(() => Social, { name: 'deleteSocial' })
  deleteSocial(
    @Context('req') req: { user: string },
    @Args('id', { type: () => String }) id: number,
  ) {
    return this.service.delete({
      id: id,
      userId: req.user,
    });
  }
}
