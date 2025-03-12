import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/shared';
import { handlePrismaError } from '../common/utils';
import { Prisma, Stack } from '@prisma/client';

const modelName = 'Stack';
@Injectable()
export class StackService {
  constructor(private prisma: PrismaService) {}
  private model = this.prisma.stack;
  async stack(where: Prisma.StackWhereUniqueInput): Promise<Stack | null> {
    return this.model.findUnique({
      where,
    });
  }
  async stacks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.StackWhereUniqueInput;
    where?: Prisma.StackWhereInput;
    orderBy?: Prisma.StackOrderByWithRelationInput;
  }): Promise<Stack[] | []> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.model.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.StackCreateInput): Promise<Stack> {
    try {
      return await this.model.create({
        data,
      });
    } catch (error) {
      handlePrismaError(error, modelName);
    }
  }

  async update(params: {
    where: Prisma.StackWhereUniqueInput;
    data: Prisma.StackUpdateInput;
  }): Promise<Stack> {
    const { where, data } = params;
    return this.model.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.StackWhereUniqueInput): Promise<Stack> {
    try {
      return this.model.delete({ where });
    } catch (error) {
      handlePrismaError(error, modelName);
    }
  }
}
