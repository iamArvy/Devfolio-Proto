import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ContactService } from './service';
import { CreateContactDto, UpdateContactDto } from './dto';
import { Contact } from './entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@app/shared/guards';

@UseGuards(GqlAuthGuard)
@Resolver(() => Contact)
export class ContactResolver {
  constructor(private readonly service: ContactService) {}

  @Mutation(() => Contact, { name: 'createContact' })
  create(
    @Context('req') req: { user: string },
    @Args('data') data: CreateContactDto,
  ) {
    return this.service.create({
      ...data,
      user: { connect: { id: req.user } },
    });
  }

  @Query(() => [Contact], { name: 'getContacts' })
  contacts(@Context('req') req: { user: string }) {
    return this.service.contacts({ where: { userId: req.user } });
  }

  @Query(() => Contact, { name: 'getContact', nullable: true })
  contact(
    @Context('req') req: { user: string },
    @Args('id', { type: () => String }) id: number,
  ) {
    return this.service.contact({
      id: id,
      userId: req.user,
    });
  }

  @Mutation(() => Contact, { name: 'updateContact' })
  updateContact(
    @Context('req') req: { user: string },
    @Args('id') id: number,
    @Args('data') data: UpdateContactDto,
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

  @Mutation(() => Contact, { name: 'deleteContact' })
  deleteContact(
    @Context('req') req: { user: string },
    @Args('id', { type: () => String }) id: number,
  ) {
    return this.service.delete({
      id: id,
      userId: req.user,
    });
  }
}
