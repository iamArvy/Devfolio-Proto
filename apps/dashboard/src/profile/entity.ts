import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Profile as PrismaProfile } from '@prisma/client';

@ObjectType()
export class Profile implements PrismaProfile {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  id: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  firstName: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  lastName: string;

  @Field(() => String, {
    nullable: true,
    description: 'Example field (placeholder)',
  })
  image: string | null;

  @Field(() => String, { description: 'Example field (placeholder)' })
  about: string | null;

  @Field(() => String, { description: 'Example field (placeholder)' })
  userId: string;

  @Field(() => Date, { description: 'Example field (placeholder)' })
  createdAt: Date;

  @Field(() => Date, { description: 'Example field (placeholder)' })
  updatedAt: Date;
}
