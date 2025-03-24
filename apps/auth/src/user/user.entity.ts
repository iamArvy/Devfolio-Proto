import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User as PrismaUser } from '@prisma/client';

@ObjectType()
export class User implements PrismaUser {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  id: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  email: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  passwordHash: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  clientId: string | null;

  @Field(() => String, { description: 'Example field (placeholder)' })
  clientSecret: string | null;

  @Field(() => String, { description: 'Example field (placeholder)' })
  refreshToken: string | null;

  @Field(() => Date, { description: 'Example field (placeholder)' })
  createdAt: Date;

  @Field(() => Date, { description: 'Example field (placeholder)' })
  updatedAt: Date;
}
