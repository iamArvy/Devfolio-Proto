import { UserService } from '@app/shared/user/service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  private async compareSecrets(hash, secret) {
    const valid = await argon.verify(hash, secret);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
  }

  private async generateToken(
    sub: string,
    email: string,
    type: 'refresh' | 'access',
  ): Promise<string> {
    const payload = { sub, email };
    console.log(payload);
    const secret: string =
      this.config.get(type === 'refresh' ? 'REFRESH_SECRET' : 'JWT_SECRET') ||
      '';
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: type === 'refresh' ? '7d' : '15m',
      secret: secret,
    });
    return token;
  }

  async signup(
    dto: RegisterDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const hash = await argon.hash(dto.password);
    const user = await this.userService.create({
      email: dto.email,
      password: hash,
      name: dto.firstName + ' ' + dto.lastName,
    });

    return {
      access_token: await this.generateToken(user.id, user.email, 'access'),
      refresh_token: await this.generateToken(user.id, user.email, 'refresh'),
    };
  }

  async login(
    dto: LoginDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.userService.user({
      where: { email: dto.email },
      select: { ...this.userService.public, password: true },
    });

    if (!user) throw new NotFoundException('User not found');
    await this.compareSecrets(user.password, dto.password);
    return {
      access_token: await this.generateToken(user.id, user.email, 'access'),
      refresh_token: await this.generateToken(user.id, user.email, 'refresh'),
    };
  }

  async logout(id: string) {
    await this.userService.update({
      where: { id: id },
      data: { refreshToken: null },
    });
  }

  async refreshTokens(refreshToken: string) {
    // Decode user ID from refresh token
    const decoded: { sub: string } = this.jwtService.verify(refreshToken, {
      secret: this.config.get('REFRESH_SECRET') || '',
    });
    const userId = decoded.sub;

    // Get user and compare stored hash
    const user = await this.userService.user({
      where: { id: userId },
      select: { refreshToken: true },
    });

    if (!user || !user.refreshToken)
      throw new UnauthorizedException('Invalid refresh token');

    await this.compareSecrets(user.refreshToken, refreshToken);

    // Generate new tokens
    const newAccessToken = await this.generateToken(
      userId,
      user.email,
      'access',
    );
    const newRefreshToken = await this.generateToken(
      userId,
      user.email,
      'refresh',
    );

    // Hash and update refresh token in DB
    const hashedNewRefreshToken = await argon.hash(newRefreshToken);
    await this.userService.update({
      where: { id: userId },
      data: { refreshToken: hashedNewRefreshToken },
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
