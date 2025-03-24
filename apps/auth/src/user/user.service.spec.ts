import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/shared';

const modelName = 'User';
const mockData = {
  email: 'testemail@test.com',
  password: 'testingpassword',
};
const mockValue = {
  ...mockData,
  id: 'user123',
  clientId: null,
  refreshToken: null,
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

  describe('user', () => {
    it(`should return a ${modelName} if user with email exist`, async () => {
      jest.spyOn(model, 'findUniqueOrThrow').mockResolvedValue(mockValue);
      const result = await service.user({ where: { email: mockValue.email } });
      expect(result).toEqual(mockValue);
    });

    it(`should return a ${modelName} if user with id exist`, async () => {
      jest.spyOn(model, 'findUniqueOrThrow').mockResolvedValue(mockValue);
      const result = await service.user({ where: { id: mockValue.id } });
      expect(result).toEqual(mockValue);
    });

    it(`should throw NotFoundException if ${modelName} with email is not found`, async () => {
      jest.spyOn(model, 'findUniqueOrThrow').mockRejectedValue(
        new PrismaClientKnownRequestError('Not found', {
          code: 'P2025',
          clientVersion: '3.0',
        }),
      );

      await expect(
        service.user({ where: { email: 'anyemail@gmail.com' } }),
      ).rejects.toThrow(NotFoundException);
    });

    it(`should throw NotFoundException if ${modelName} with id is not found`, async () => {
      jest.spyOn(model, 'findUniqueOrThrow').mockRejectedValue(
        new PrismaClientKnownRequestError('Not found', {
          code: 'P2025',
          clientVersion: '3.0',
        }),
      );

      await expect(
        service.user({ where: { id: 'unknownid' } }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('users', () => {
    it('should return an array of users with parameters', async () => {
      jest.spyOn(model, 'findMany').mockResolvedValue([mockValue]);
      const result = await service.users({
        take: 1,
        where: {
          email: mockValue.email,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      expect(result).toBe([mockValue]);
    });

    it('should return an empty array if no users with parameters', async () => {
      jest.spyOn(model, 'findMany').mockResolvedValue([]);
      const result = await service.users({
        take: 1,
        where: {
          email: mockValue.email,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      expect(result).toBe([]);
    });
  });

  describe('update', () => {
    it(`should update a ${modelName} with provided id`, async () => {
      jest.spyOn(model, 'update').mockResolvedValue(mockValue);

      const result = await service.update({
        where: {
          id: mockValue.id,
        },
        data: {
          email: 'newuseremail@gmail.com',
          password: 'newuserpassword@gmail.com',
        },
      });
      expect(result).toBe(`${modelName} updated successfully`);
    });

    it(`should update a ${modelName} with provided email`, async () => {
      jest.spyOn(model, 'update').mockResolvedValue(mockValue);

      const result = await service.update({
        where: {
          email: mockValue.email,
        },
        data: {
          email: 'newuseremail@gmail.com',
          password: 'newuserpassword@gmail.com',
        },
      });
      expect(result).toBe(`${modelName} updated successfully`);
    });

    it(`should throw NotFoundException if ${modelName} with id is not found`, async () => {
      jest.spyOn(model, 'update').mockRejectedValue(
        new PrismaClientKnownRequestError('Not found', {
          code: 'P2025',
          clientVersion: '3.0',
        }),
      );

      await expect(
        service.update({
          where: {
            id: 'randomId',
          },
          data: {
            email: 'newuseremail@gmail.com',
            password: 'newuserpassword@gmail.com',
          },
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it(`should throw NotFoundException if ${modelName} with email is not found`, async () => {
      jest.spyOn(model, 'update').mockRejectedValue(
        new PrismaClientKnownRequestError('Not found', {
          code: 'P2025',
          clientVersion: '3.0',
        }),
      );

      await expect(
        service.update({
          where: {
            email: 'randomemail@random.com',
          },
          data: {
            email: 'newuseremail@gmail.com',
            password: 'newuserpassword@gmail.com',
          },
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it(`should delete a ${modelName} with given id or email`, async () => {
      jest.spyOn(model, 'delete').mockResolvedValue(mockValue);

      const result = await service.delete({
        id: mockValue.id,
        email: mockValue.email,
      });
      expect(result).toBe(`${modelName} deleted successfully`);
    });

    it(`should throw NotFoundException if ${modelName} is not found`, async () => {
      jest.spyOn(model, 'delete').mockRejectedValue(
        new PrismaClientKnownRequestError('Not found', {
          code: 'P2025',
          clientVersion: '3.0',
        }),
      );

      await expect(
        service.delete({ id: mockValue.id, email: mockValue.email }),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
