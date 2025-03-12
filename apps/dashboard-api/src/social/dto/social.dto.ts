import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class CreateDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  icon: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

class UpdateDto extends PartialType(CreateDto) {}

export { CreateDto, UpdateDto };
