import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email for the user',
  })
  email: string;

  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty({
    example: 'S3cureP@ssw0rd',
    description: 'The password for the user',
  })
  password: string;
}

class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email for the user',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'S3cureP@ssw0rd',
    description: 'The password for the user',
  })
  password: string;
}

class ClientCredentialsDto {
  @IsNotEmpty()
  @IsString()
  client_id: string;

  @IsString()
  @IsNotEmpty()
  client_secret: string;
}
export { LoginDto, RegisterDto, ClientCredentialsDto };
