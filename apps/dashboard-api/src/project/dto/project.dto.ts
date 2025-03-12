import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

class CreateDto {
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

class UpdateDto extends PartialType(CreateDto) {}

export { CreateDto, UpdateDto };
