import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class CreateDto {
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  value: string;
}

class UpdateDto extends PartialType(CreateDto) {}

export { CreateDto, UpdateDto };
