import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@app/shared';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Client } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    private prismaService: PrismaService,
  ) {}

  async validateClient(id: string, secret: string): Promise<Client> {
    const client = await this.prismaService.client.findFirst({
      where: { id: id, secret: secret },
    });

    if (!client) {
      throw new UnauthorizedException('Invalid client credentials');
    }

    return client;
  }

  async getTokens(
    id: string,
    secret: string,
  ): Promise<{ access_token: string }> {
    await this.validateClient(id, secret);

    const payload = { sub: id, secret };
    const jwtSecret: string = this.config.get('JWT_SECRET') || '';
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: jwtSecret,
    });
    return { access_token: token };
  }
}
