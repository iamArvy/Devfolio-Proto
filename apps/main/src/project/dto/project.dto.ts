import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  live?: string;

  @IsString()
  @IsOptional()
  repo?: string;

  @IsArray()
  @IsOptional()
  stack: string[];

  @IsInt()
  @IsNotEmpty()
  jobId: number;
}

class UpdateProjectDto extends PartialType(CreateProjectDto) {}

export { CreateProjectDto, UpdateProjectDto };
