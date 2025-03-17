import { IsNotEmpty, IsString } from 'class-validator';

class getTokenDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  clientSecret: string;
}

export { getTokenDto };
