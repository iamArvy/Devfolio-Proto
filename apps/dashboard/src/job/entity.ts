import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Job as PrismaJob } from '@prisma/client';

@ObjectType()
export class Job implements PrismaJob {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  role: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  description: string | null;

  @Field(() => String, { description: 'Example field (placeholder)' })
  value: string;

  @Field(() => ID, { description: 'Example field (placeholder)' })
  userId: string;

  @Field(() => Date, { description: 'Example field (placeholder)' })
  createdAt: Date;

  @Field(() => Date, { description: 'Example field (placeholder)' })
  updatedAt: Date;
}
