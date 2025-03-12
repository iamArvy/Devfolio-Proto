import { Test, TestingModule } from '@nestjs/testing';
import { StackService } from './service';
import { PrismaService } from '@app/shared';
import { NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const modelName = 'Stack';
const mockData = {
  name: 'Test',
  jobId: 1,
  icon: 'test',
  userId: 'user123',
};
const mockValue = {
  ...mockData,
  id: 1,
  userId: 'user123',
  createdAt: new Date(),
  updatedAt: new Date(),
};
const mockValues = [mockValue];
describe('StackService', () => {
  let service: StackService;
  let prisma: PrismaService;
  let model: typeof prisma.stack;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StackService,
        {
          provide: PrismaService,
          useValue: {
            stack: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUniqueOrThrow: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<StackService>(StackService);
    prisma = module.get<PrismaService>(PrismaService);
    model = prisma.stack;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it(`should create a ${modelName}`, async () => {
      jest.spyOn(model, 'create').mockResolvedValue(mockValue);

      const result = await service.create(mockData);
      expect(result).toBe(`${modelName} created successfully`);
    });
  });

  describe('stacks', () => {
    it(`should return user ${modelName}s`, async () => {
      jest.spyOn(model, 'findMany').mockResolvedValue(mockValues);

      const result = await service.stacks({
        where: { userId: mockValue.userId },
      });
      expect(result).toEqual(mockValues);
    });
  });

  describe('stack', () => {
    it(`should return a user ${modelName}`, async () => {
      jest.spyOn(model, 'findUniqueOrThrow').mockResolvedValue(mockValue);

      const result = await service.stack({ id: mockValue.id });
      expect(result).toEqual(mockValue);
    });

    it(`should throw NotFoundException if ${modelName} is not found`, async () => {
      jest.spyOn(model, 'findUniqueOrThrow').mockRejectedValue(
        new PrismaClientKnownRequestError('Not found', {
          code: 'P2025',
          clientVersion: '3.0',
        }),
      );

      await expect(service.stack({ id: 2 })).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it(`should update a user ${modelName}`, async () => {
      jest.spyOn(model, 'update').mockResolvedValue(mockValue);

      const result = await service.update({
        where: { id: mockValue.id, userId: mockValue.userId },
        data: {
          name: 'Updated Name',
        },
      });
      expect(result).toBe(`${modelName} updated successfully`);
    });

    it(`should throw NotFoundException if ${modelName} is not found`, async () => {
      jest.spyOn(model, 'update').mockRejectedValue(
        new PrismaClientKnownRequestError('Not found', {
          code: 'P2025',
          clientVersion: '3.0',
        }),
      );

      await expect(
        service.update({
          where: { id: 4, userId: 'user345' },
          data: {
            name: 'Updated Name',
          },
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it(`should delete a user ${modelName}`, async () => {
      jest.spyOn(model, 'delete').mockResolvedValue(mockValue);

      const result = await service.delete({ id: mockValue.id });
      expect(result).toBe(`${modelName} deleted successfully`);
    });

    it(`should throw NotFoundException if ${modelName} is not found`, async () => {
      jest.spyOn(model, 'delete').mockRejectedValue(
        new PrismaClientKnownRequestError('Not found', {
          code: 'P2025',
          clientVersion: '3.0',
        }),
      );

      await expect(service.delete({ id: 67 })).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
