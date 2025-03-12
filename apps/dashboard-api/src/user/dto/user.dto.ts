import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
class UpdateUserDto {
  // @IsString()
  // @IsOptional()
  // firstName?: string;

  // @IsString()
  // @IsOptional()
  // lastName?: string;

  @IsString()
  @IsOptional()
  about?: string;
}

class UpdateEmailDto {
  @IsEmail()
  @IsOptional()
  email?: string;
}
class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
export { UpdateUserDto, UpdatePasswordDto, CreateUserDto, UpdateEmailDto };
