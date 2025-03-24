import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateEmailDto, UpdatePasswordDto } from '../dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly service: UserService) {}

  // @Query(() => User, { name: 'user', nullable: true })
  // getUserWithId(@Args('id', { type: () => String }) id: string) {
  //   return this.service.user({
  //     where: { id: id },
  //   });
  // }

  @Query(() => User, { name: 'user', nullable: true })
  getUserWithEmail(@Args('email', { type: () => String }) email: string) {
    return this.service.user({
      where: { email: email },
    });
  }

  @Mutation(() => User, { name: 'update_email' })
  updateUserEmail(@Args('id') id: string, @Args('data') data: UpdateEmailDto) {
    return this.service.update({
      where: {
        id: id,
      },
      data: {
        email: data.email,
      },
    });
  }

  @Mutation(() => User, { name: 'update_password' })
  updateUserPassword(
    @Args('id') id: string,
    @Args('data') data: UpdatePasswordDto,
  ) {
    return this.service.updatePassword(id, data);
  }

  @Mutation(() => String, { name: 'delete' })
  removeProfile(@Args('id', { type: () => String }) id: string) {
    return this.service.delete({
      id: id,
    });
  }
}
