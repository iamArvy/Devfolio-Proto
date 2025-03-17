import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './service';
import { getTokenDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('token')
  getToken(@Body() data: getTokenDto) {
    return this.service.getTokens(data.clientId, data.clientSecret);
  }
}
