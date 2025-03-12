import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class CreateContactDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'https://example.com',
    description: 'The url for the user contact',
  })
  url?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'mingcute:icon',
    description: 'Icon name from Iconify for the contact',
  })
  icon?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'email',
    description: 'The name of the contact information',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'example@example.com',
    description: 'The value of the contact information',
    required: true,
  })
  value: string;
}

class UpdateContactDto extends PartialType(CreateContactDto) {}

export { CreateContactDto, UpdateContactDto };
