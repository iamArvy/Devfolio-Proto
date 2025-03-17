import { Controller, Get, UseGuards } from '@nestjs/common';
import { PortfolioService } from './service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '@app/shared/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller()
export class PortfolioController {
  constructor(private readonly service: PortfolioService) {}

  @Get('get-data')
  async getData(@GetUser('id') userId: string): Promise<User> {
    return this.service.getData(userId);
  }
}
