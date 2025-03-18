import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class CreateStackDto {
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

class UpdateStackDto extends PartialType(CreateStackDto) {}

export { CreateStackDto, UpdateStackDto };
