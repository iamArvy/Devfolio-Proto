import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Project as PrismaProject } from '@prisma/client';

@ObjectType()
export class Project implements PrismaProject {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  description: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  image: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  live: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  repo: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  jobId: number;

  @Field(() => ID, { description: 'Example field (placeholder)' })
  userId: string;

  @Field(() => Date, { description: 'Example field (placeholder)' })
  createdAt: Date;

  @Field(() => Date, { description: 'Example field (placeholder)' })
  updatedAt: Date;
}
