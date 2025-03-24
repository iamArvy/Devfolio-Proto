import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
class CreateSocialDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Url of the Social Object' })
  url: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Icon of the Social Object' })
  icon?: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Name of the Social Object' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Value of the Social Object' })
  value: string;
}

@InputType()
class UpdateSocialDto extends PartialType(CreateSocialDto) {}

export { CreateSocialDto, UpdateSocialDto };
