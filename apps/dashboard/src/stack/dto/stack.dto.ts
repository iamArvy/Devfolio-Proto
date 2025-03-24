import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
class CreateStackDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Name of the stack' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Job ID for the stack' })
  jobId: number;

  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Icon for the Stack' })
  icon?: string;
}

@InputType()
class UpdateStackDto extends PartialType(CreateStackDto) {}

export { CreateStackDto, UpdateStackDto };
