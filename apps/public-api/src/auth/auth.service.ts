import { Injectable } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { UserService } from '@app/shared/user/service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
    private clientService: ClientService,
  ) {}

  // async getClientToken(dto: ClientTokenDto) {
  //   const client = await this.clientService.findOne(dto.client_id);
  //   await this.compareSecrets(client.secret, dto.client_secret);
  //   const payload = { sub: client.id, secret: client.secret };
  //   return this.generateToken(payload);
  // }
}
