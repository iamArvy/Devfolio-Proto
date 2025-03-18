import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/shared/prisma';
import { handlePrismaError } from '../common/utils';
import { Contact, Prisma } from '@prisma/client';

const modelName = 'Contact';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}
  private model = this.prisma.contact;

  async contact(
    where: Prisma.ContactWhereUniqueInput,
  ): Promise<Contact | null> {
    return this.model.findUnique({
      where,
    });
  }
  async contacts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ContactWhereUniqueInput;
    where?: Prisma.ContactWhereInput;
    orderBy?: Prisma.ContactOrderByWithRelationInput;
  }): Promise<Contact[] | []> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.model.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.ContactCreateInput): Promise<Contact> {
    try {
      return await this.model.create({
        data,
      });
    } catch (error) {
      handlePrismaError(error, modelName);
    }
  }

  async update(params: {
    where: Prisma.ContactWhereUniqueInput;
    data: Prisma.ContactUpdateInput;
  }): Promise<Contact> {
    const { where, data } = params;
    return this.model.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.ContactWhereUniqueInput): Promise<Contact> {
    try {
      return this.model.delete({ where });
    } catch (error) {
      handlePrismaError(error, modelName);
    }
  }
}
