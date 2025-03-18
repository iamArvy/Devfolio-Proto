import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Web Developer',
    description: 'The name of the job role',
  })
  role: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Develops websites and web applications',
    description: 'the description of the job',
  })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Web Development',
    description: 'The name of the job',
  })
  value: string;
}

class UpdateJobDto extends PartialType(CreateJobDto) {}

export { CreateJobDto, UpdateJobDto };
