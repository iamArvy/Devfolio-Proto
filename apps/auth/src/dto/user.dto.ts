import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  // IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

// @InputType()
// class CreateUserDto {
//   @IsEmail()
//   @IsNotEmpty()
//   @Field()
//   email: string;

//   @IsString()
//   @IsNotEmpty()
//   @Field()
//   password: string;
// }

@InputType()
class UpdateEmailDto {
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;
}

@InputType()
class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  oldPassword: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @Field()
  newPassword: string;
}

export { UpdatePasswordDto, UpdateEmailDto };
