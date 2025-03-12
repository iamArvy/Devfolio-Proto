import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

const modelName = 'User';
const mockData = {
  email: 'testemail@test.com',
  name: 'Test User',
  password: 'testingpassword',
};
const mockValue = {
  ...mockData,
  id: 'user123',
  image: '',
  about: '',
  clientId: '',
  location: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};
// const mockValues = [mockValue];
describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;
  let model: typeof prisma.user;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
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

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
    model = prisma.user;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it(`should create a ${modelName}`, async () => {
      jest.spyOn(model, 'create').mockResolvedValue(mockValue);

      const result = await service.create(mockData);
      expect(result).toBe(mockValue);
    });

    it(`should throw a ForbiddenException if ${modelName} already exists`, async () => {
      jest.spyOn(model, 'create').mockRejectedValue(
        new PrismaClientKnownRequestError('Unique exists', {
          code: 'P2002',
          clientVersion: '3.0',
        }),
      );

      await expect(service.create(mockData)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('findUserByEmail', () => {
    it(`should return a ${modelName}`, async () => {
      jest.spyOn(model, 'findUniqueOrThrow').mockResolvedValue(mockValue);
      const result = await service.findUserByEmail(mockValue.email);
      expect(result).toEqual(mockValue);
    });

    it(`should throw NotFoundException if ${modelName} is not found`, async () => {
      jest.spyOn(model, 'findUniqueOrThrow').mockRejectedValue(
        new PrismaClientKnownRequestError('Not found', {
          code: 'P2025',
          clientVersion: '3.0',
        }),
      );

      await expect(
        service.findUserByEmail('anyemail@gmail.com'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it(`should return a ${modelName}`, async () => {
      jest.spyOn(model, 'findUniqueOrThrow').mockResolvedValue(mockValue);

      const result = await service.findOne(mockValue.id);
      expect(result).toEqual(mockValue);
    });

    it(`should throw NotFoundException if ${modelName} is not found`, async () => {
      jest.spyOn(model, 'findUniqueOrThrow').mockRejectedValue(
        new PrismaClientKnownRequestError('Not found', {
          code: 'P2025',
          clientVersion: '3.0',
        }),
      );

      await expect(service.findOne('user234')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it(`should update a ${modelName}`, async () => {
      jest.spyOn(model, 'update').mockResolvedValue(mockValue);

      const result = await service.update(mockValue.id, {
        about: 'testabout',
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
        service.update('user234', { about: 'Test' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateEmail', () => {
    it(`should update email of ${modelName}`, async () => {
      jest.spyOn(model, 'update').mockResolvedValue(mockValue);

      const result = await service.updateEmail(mockValue.id, {
        email: 'testemail@gmail.com',
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
        service.updateEmail('user234', { email: 'testemail@gmail.com' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it(`should delete a ${modelName}`, async () => {
      jest.spyOn(model, 'delete').mockResolvedValue(mockValue);

      const result = await service.remove(mockValue.id);
      expect(result).toBe(`${modelName} deleted successfully`);
    });

    it(`should throw NotFoundException if ${modelName} is not found`, async () => {
      jest.spyOn(model, 'delete').mockRejectedValue(
        new PrismaClientKnownRequestError('Not found', {
          code: 'P2025',
          clientVersion: '3.0',
        }),
      );

      await expect(service.remove('user234')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
