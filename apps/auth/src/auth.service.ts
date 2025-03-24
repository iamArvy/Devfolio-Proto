import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { ClientCredentialsDto, LoginDto, RegisterDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user/user.service';
import * as argon from 'argon2';
import { AuthResponse, ClientAuthResponse } from './auth.response';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async compareSecrets(hash, secret): Promise<boolean> {
    const valid = await argon.verify(hash, secret);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    return true;
  }

  private async generateToken(
    sub: string,
    email: string,
    type: 'refresh' | 'access',
  ): Promise<string> {
    const payload = { sub, email };
    const secret: string =
      this.config.get(type === 'refresh' ? 'REFRESH_SECRET' : 'JWT_SECRET') ||
      '';
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: type === 'refresh' ? '7d' : '15m',
      secret: secret,
    });
    return token;
  }

  private async authenticateUser(id: string, email: string) {
    const access_token = await this.generateToken(id, email, 'access');
    const refresh_token = await this.generateToken(id, email, 'refresh');

    const hashedRefreshToken = await argon.hash(refresh_token);
    await this.userService.update({
      where: { id },
      data: { refreshToken: hashedRefreshToken },
    });
    return {
      access: { token: access_token, expiresIn: 15000 },
      refresh: { token: refresh_token, expiresIn: 24000 },
    };
  }

  async signup(dto: RegisterDto): Promise<AuthResponse> {
    if (!dto) throw new UnauthorizedException('Invalid credentials');
    const exists = await this.userService.user({
      where: { email: dto.email },
    });
    if (exists) throw new UnauthorizedException('User already exists');
    const hash = await argon.hash(dto.password);
    const user = await this.userService.create({
      email: dto.email,
      passwordHash: hash,
    });
    return this.authenticateUser(user.id, user.email);
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.userService.user({
      where: { email: dto.email },
    });
    if (!user) throw new NotFoundException('User not found');
    await this.compareSecrets(user.passwordHash, dto.password);
    return this.authenticateUser(user.id, user.email);
  }

  async refreshToken(refresh_token: string): Promise<AuthResponse> {
    const decoded: { sub: string; email: string } = this.jwtService.verify(
      refresh_token,
      {
        secret: this.config.get('REFRESH_SECRET') || '',
      },
    );
    const user = await this.userService.user({
      where: { id: decoded.sub },
      select: { ...this.userService.public, refreshToken: true },
    });

    if (!user || !user.refreshToken)
      throw new UnauthorizedException('Invalid refresh token');
    await this.compareSecrets(user.refreshToken, refresh_token);
    return this.authenticateUser(user.id, user.email);
  }

  async logout(id: string) {
    await this.userService.update({
      where: { id: id },
      data: { refreshToken: null },
    });
  }

  // Client Auth

  private async authenticateClient(id: string, secret: string) {
    const access_token = await this.generateToken(id, secret, 'access');
    return {
      access: { token: access_token, expiresIn: 15000 },
    };
  }

  async getClientToken({
    client_id,
    client_secret,
  }: ClientCredentialsDto): Promise<ClientAuthResponse> {
    const client = await this.userService.user({
      where: { clientId: client_id, clientSecret: client_secret },
      select: { clientSecret: true, clientId: true },
    });
    if (!client) throw new NotFoundException('Client not found');
    if (!client.clientId || !client.clientSecret)
      throw new UnauthorizedException('Invalid credentials');
    return this.authenticateClient(client.clientId, client.clientSecret);
  }
}
