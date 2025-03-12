import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/shared';
import { handlePrismaError } from '../common/utils';
import { Prisma, Social } from '@prisma/client';

const modelName = 'Social';

@Injectable()
export class SocialService {
  constructor(private prisma: PrismaService) {}
  private model = this.prisma.social;
  async social(where: Prisma.SocialWhereUniqueInput): Promise<Social | null> {
    return this.model.findUnique({
      where,
    });
  }
  async socials(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SocialWhereUniqueInput;
    where?: Prisma.SocialWhereInput;
    orderBy?: Prisma.SocialOrderByWithRelationInput;
  }): Promise<Social[] | []> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.model.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.SocialCreateInput): Promise<Social> {
    try {
      return await this.model.create({
        data,
      });
    } catch (error) {
      handlePrismaError(error, modelName);
    }
  }

  async update(params: {
    where: Prisma.SocialWhereUniqueInput;
    data: Prisma.SocialUpdateInput;
  }): Promise<Social> {
    const { where, data } = params;
    return this.model.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.SocialWhereUniqueInput): Promise<Social> {
    try {
      return this.model.delete({ where });
    } catch (error) {
      handlePrismaError(error, modelName);
    }
  }
}
