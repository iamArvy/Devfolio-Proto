import { Field, InputType, PartialType } from '@nestjs/graphql';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Name of the Project' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Description of the Project' })
  description: string;

  @IsString()
  @IsOptional()
  @Field(() => String, {
    description: 'link to the live preview of the Project',
  })
  live?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Link to the repository of the Project' })
  repo?: string;

  @IsArray()
  @IsOptional()
  @Field(() => [String], {
    description: 'Array of tech stacks used in creating the of the Project',
  })
  stack?: string[];

  @IsInt()
  @IsNotEmpty()
  @Field(() => String, { description: 'Job Id of the Project' })
  jobId: number;
}

@InputType()
class UpdateProjectDto extends PartialType(CreateProjectDto) {}

export { CreateProjectDto, UpdateProjectDto };
