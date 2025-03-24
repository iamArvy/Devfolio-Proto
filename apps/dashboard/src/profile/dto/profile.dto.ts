import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
class CreateProfileDto {
  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsNotEmpty()
  firstName: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsNotEmpty()
  lastName: string;

  @Field(() => String || null, { description: 'Example field (placeholder)' })
  @IsOptional()
  about?: string;
}

@InputType()
class UpdateProfileDto extends PartialType(CreateProfileDto) {}

export { CreateProfileDto, UpdateProfileDto };
