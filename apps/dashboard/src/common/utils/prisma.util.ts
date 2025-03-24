import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

function handlePrismaError(error: any, modelName: string): never {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2025')
      throw new NotFoundException(`${modelName} not found` + error.message);
    if (error.code === 'P2002')
      throw new ForbiddenException(
        `${modelName} already exists` + error.message,
      );
  }
  throw error;
}

export { handlePrismaError };
