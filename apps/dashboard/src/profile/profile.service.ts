import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/shared/prisma';
import { Prisma, Profile } from '@prisma/client';
import { handlePrismaError } from '../common/utils';

const modelName = 'Profile';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}
  private model = this.prisma.profile;

  async profile(
    where: Prisma.ProfileWhereUniqueInput,
  ): Promise<Profile | null> {
    return this.model.findUnique({
      where,
    });
  }

  async profiles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProfileWhereUniqueInput;
    where?: Prisma.ProfileWhereInput;
    orderBy?: Prisma.ProfileOrderByWithRelationInput;
  }): Promise<Profile[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.model.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.ProfileCreateInput): Promise<Profile> {
    try {
      return await this.model.create({
        data,
      });
    } catch (error) {
      handlePrismaError(error, modelName);
    }
  }

  async update(params: {
    where: Prisma.ProfileWhereUniqueInput;
    data: Prisma.ProfileUpdateInput;
  }): Promise<Profile> {
    const { where, data } = params;
    return this.model.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.ProfileWhereUniqueInput): Promise<Profile> {
    try {
      return this.model.delete({ where });
    } catch (error) {
      handlePrismaError(error, modelName);
    }
  }
}
