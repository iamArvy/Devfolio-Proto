import { User as UserEntity } from './user.entity';
import { PrismaService } from '@app/shared';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { handlePrismaError } from 'apps/dashboard/src/common/utils';
import * as argon from 'argon2';
import { UpdatePasswordDto } from '../dto';

const modelName = 'User';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private model = this.prisma.user;
  public = {
    id: true,
    email: true,
  };

  async compareSecrets(hash, secret): Promise<boolean> {
    const valid = await argon.verify(hash, secret);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    return true;
  }

  async user(params: {
    where: Prisma.UserWhereUniqueInput;
    select?: Prisma.UserSelect;
  }): Promise<User | null> {
    const { where, select } = params;
    try {
      return this.model.findUnique({
        where,
        select,
      });
    } catch (error) {
      handlePrismaError(error, modelName);
    }
  }
  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[] | []> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.model.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return await this.model.create({
        data,
      });
    } catch (error) {
      handlePrismaError(error, modelName);
    }
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<UserEntity> {
    const { where, data } = params;
    return this.model.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      return this.model.delete({ where });
    } catch (error) {
      handlePrismaError(error, modelName);
    }
  }

  async updatePassword(
    id: string,
    data: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.user({
      where: { id: id },
    });
    if (!user) throw new NotFoundException('User not found');

    const valid = await this.compareSecrets(
      user.passwordHash,
      data.oldPassword,
    );
    if (!valid) throw new UnauthorizedException('Old password incorrect');

    const hash = await argon.hash(data.newPassword);

    return this.update({
      where: { id: id },
      data: {
        passwordHash: hash,
      },
    });
  }
}
