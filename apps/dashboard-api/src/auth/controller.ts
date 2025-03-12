import {
  Controller,
  Body,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './service';
import { LoginDto, RegisterDto } from './dto';
import { GetUser } from '@app/shared/decorator';
import { JwtGuard } from './guard';
import { ApiBearerAuth, ApiOkResponse, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiOkResponse({ description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Post('register')
  signup(@Body() dto: RegisterDto) {
    return this.service.signup(dto);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.service.login(body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('logout')
  logout(@GetUser('id') id: string) {
    return this.service.logout(id);
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken)
      throw new UnauthorizedException('No refresh token provided');
    return await this.service.refreshTokens(refreshToken);
  }
}
