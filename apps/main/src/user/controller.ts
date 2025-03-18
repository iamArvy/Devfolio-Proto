import {
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '@app/shared/user';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '@app/shared/decorator';
import { User } from '@prisma/client';
import { UpdateEmailDto, UpdatePasswordDto } from './dto';
import * as argon from 'argon2';
import { handlePrismaError } from '../common/utils';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('')
  async profile(@GetUser('id') id: string): Promise<User> {
    const user = await this.service.user({
      where: {
        id,
      },
      select: {
        ...this.service.public,
      },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Post('updatePassword')
  async updatePassword(@GetUser('id') id: string, dto: UpdatePasswordDto) {
    try {
      const user = await this.service.user({
        where: {
          id,
        },
        select: {
          password: true,
        },
      });

      if (!user) throw new NotFoundException('User not found');

      if (!(await argon.verify(user.password, dto.oldPassword)))
        throw new ForbiddenException('Invalid old password');

      if (dto.password !== dto.confirmPassword)
        throw new Error('Passwords do not match');

      const hash = await argon.hash(dto.password);
      await this.service.update({
        where: {
          id: id,
        },
        data: {
          password: hash,
        },
      });
      return 'Password updated successfully';
    } catch (error) {
      handlePrismaError(error, 'User');
    }
  }

  @Post('updateEmail')
  async updateEmail(@GetUser('id') id: string, data: UpdateEmailDto) {
    try {
      await this.service.update({
        where: {
          id: id,
        },
        data: {
          ...data,
        },
      });
    } catch (error) {
      handlePrismaError(error, 'User');
    }
  }
}
