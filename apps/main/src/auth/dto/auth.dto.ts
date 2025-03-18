import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  // MinLength,
} from 'class-validator';

class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email for the user',
  })
  email!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'password',
    description: 'The password for the user',
  })
  password: string;
}

class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email for the user',
  })
  email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'John',
    description: 'The last name of the user',
  })
  lastName: string;

  // @MinLength(6)
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty({
    example: 'S3cureP@ssw0rd',
    description: 'The password for the user',
  })
  password: string;
}

export { LoginDto, RegisterDto };
