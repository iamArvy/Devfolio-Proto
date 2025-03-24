import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientCredentialsDto, LoginDto, RegisterDto } from './dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Get('health')
  health() {
    return 'OK';
  }

  @Post('get-client-token')
  getClientToken(@Body() body: ClientCredentialsDto) {
    return this.service.getClientToken(body);
  }

  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.service.signup(data);
  }

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.service.login(data);
  }

  @Post('refresh-token')
  refreshToken(@Body() data: { refresh_token: string }) {
    return this.service.refreshToken(data.refresh_token);
  }

  @ApiBearerAuth()
  @Post('logout')
  logout(@Request() req: { user: string }) {
    return this.service.logout(req.user);
  }
}
