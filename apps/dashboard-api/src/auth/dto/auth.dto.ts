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
  email!: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  // @MinLength(6)
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}

class ClientTokenDto {
  @IsNotEmpty()
  @IsString()
  client_id: string;

  @IsNotEmpty()
  @IsString()
  client_secret: string;
}
export { LoginDto, RegisterDto, ClientTokenDto };
