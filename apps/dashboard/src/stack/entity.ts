import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Stack as PrismaStack } from '@prisma/client';

@ObjectType()
export class Stack implements PrismaStack {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  icon: string | null;

  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  jobId: number;

  @Field(() => ID, { description: 'Example field (placeholder)' })
  userId: string;

  @Field(() => Date, { description: 'Example field (placeholder)' })
  createdAt: Date;

  @Field(() => Date, { description: 'Example field (placeholder)' })
  updatedAt: Date;
}
