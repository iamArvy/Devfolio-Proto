import { Field, InputType, PartialType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
class CreateContactDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'https://example.com',
    description: 'The url for the user contact',
  })
  @Field(() => String, { description: 'Link for the contact information' })
  url?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'mingcute:icon',
    description: 'Icon name from Iconify for the contact',
  })
  @Field(() => String, { description: 'Icon for the contact information' })
  icon?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'email',
    description: 'The name of the contact information',
  })
  @Field(() => String, { description: 'Name of the contact information' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'example@example.com',
    description: 'The value of the contact information',
    required: true,
  })
  @Field(() => String, { description: 'Value for the contact information' })
  value: string;
}

@InputType()
class UpdateContactDto extends PartialType(CreateContactDto) {}

export { CreateContactDto, UpdateContactDto };
