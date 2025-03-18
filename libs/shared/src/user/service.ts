import { PrismaService } from '../prisma/prisma.service';
import { handlePrismaError } from '../../../../apps/main/src/common/utils';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

const modelName = 'User';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private model = this.prisma.user;
  public = {
    id: true,
    name: true,
    email: true,
  };

  async user(params: {
    where: Prisma.UserWhereUniqueInput;
    select: Prisma.UserSelect;
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
  }): Promise<string> {
    const { where, data } = params;
    await this.model.update({
      data,
      where,
    });

    return 'User Updated Successfully';
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      return this.model.delete({ where });
    } catch (error) {
      handlePrismaError(error, modelName);
    }
  }
}
