import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/shared/prisma';
import { handlePrismaError } from '../common/utils';
import { Project, Prisma } from '@prisma/client';
const modelName = 'Project';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  private model = this.prisma.project;

  async project(
    where: Prisma.ProjectWhereUniqueInput,
  ): Promise<Project | null> {
    return this.model.findUnique({
      where,
    });
  }

  async projects(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectWhereUniqueInput;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput;
  }): Promise<Project[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.model.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.ProjectCreateInput): Promise<Project> {
    try {
      return await this.model.create({
        data,
      });
    } catch (error) {
      handlePrismaError(error, modelName);
    }
  }

  async update(params: {
    where: Prisma.ProjectWhereUniqueInput;
    data: Prisma.ProjectUpdateInput;
  }): Promise<Project> {
    const { where, data } = params;
    return this.model.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.ProjectWhereUniqueInput): Promise<Project> {
    try {
      return this.model.delete({ where });
    } catch (error) {
      handlePrismaError(error, modelName);
    }
  }
}
