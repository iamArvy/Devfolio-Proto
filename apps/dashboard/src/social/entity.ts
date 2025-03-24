import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Social as PrismaSocial } from '@prisma/client';

@ObjectType()
export class Social implements PrismaSocial {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  url: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  icon: string | null;

  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  value: string;

  @Field(() => ID, { description: 'Example field (placeholder)' })
  userId: string;

  @Field(() => Date, { description: 'Example field (placeholder)' })
  createdAt: Date;

  @Field(() => Date, { description: 'Example field (placeholder)' })
  updatedAt: Date;
}
