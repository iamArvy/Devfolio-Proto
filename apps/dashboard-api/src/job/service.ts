import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/shared/prisma';
import { handlePrismaError } from '../common/utils';
import { Job, Prisma } from '@prisma/client';

const modelName = 'Job';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}
  private model = this.prisma.job;

  async job(where: Prisma.JobWhereUniqueInput): Promise<Job | null> {
    return this.model.findUnique({
      where,
    });
  }
  async jobs(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.JobWhereUniqueInput;
    where?: Prisma.JobWhereInput;
    orderBy?: Prisma.JobOrderByWithRelationInput;
  }): Promise<Job[] | []> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.model.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.JobCreateInput): Promise<Job> {
    try {
      return await this.model.create({
        data,
      });
    } catch (error) {
      handlePrismaError(error, modelName);
    }
  }

  async update(params: {
    where: Prisma.JobWhereUniqueInput;
    data: Prisma.JobUpdateInput;
  }): Promise<Job> {
    const { where, data } = params;
    return this.model.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.JobWhereUniqueInput): Promise<Job> {
    try {
      return this.model.delete({ where });
    } catch (error) {
      handlePrismaError(error, modelName);
    }
  }
}
