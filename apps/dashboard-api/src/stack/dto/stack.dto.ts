import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class CreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  jobId: number;

  @IsString()
  @IsOptional()
  icon?: string;
}

class UpdateDto extends PartialType(CreateDto) {}

export { CreateDto, UpdateDto };
