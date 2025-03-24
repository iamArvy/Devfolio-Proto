import { UserService } from '@app/shared';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class PortfolioService {
  constructor(private userService: UserService) {}
  async getData(id: string): Promise<User> {
    const user = await this.userService.user({
      where: { id },
      select: {
        ...this.userService.public,
        contact: true,
        job: true,
        projects: true,
        socials: true,
        stack: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
