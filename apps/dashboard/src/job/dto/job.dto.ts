import { Field, InputType, PartialType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Web Developer',
    description: 'The name of the job role',
  })
  @Field(() => String, { description: 'Name of the Job role' })
  role: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Develops websites and web applications',
    description: 'the description of the job',
  })
  @Field(() => String, { description: 'Description of the job' })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Web Development',
    description: 'The name of the job',
  })
  @Field(() => String, { description: 'The name of the Job' })
  value: string;
}

@InputType()
class UpdateJobDto extends PartialType(CreateJobDto) {}

export { CreateJobDto, UpdateJobDto };
