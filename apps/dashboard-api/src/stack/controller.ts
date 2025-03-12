import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { StackService } from './service';
import { GetUser } from '@app/shared/decorator';
import { CreateStackDto, UpdateStackDto } from './dto';
import { Stack } from '@prisma/client';
import { JwtGuard } from '../auth/guard';
import { GetStackPipe } from './pipe';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

const apiBody = {
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'Nest.js',
        description: 'The name of the social media',
      },
      jobId: {
        type: 'number',
        example: 1,
        description: 'Job ID for the stack',
      },
      icon: {
        type: 'string',
        example: 'logos:nestjs',
        description: 'The name of icon for the stack using Iconify',
      },
    },
  },
};

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('stack')
export class StackController {
  constructor(private readonly service: StackService) {}

  @ApiBody(apiBody)
  @Post('')
  async create(@Body() data: CreateStackDto, @GetUser('id') userId: string) {
    // const { role, description, value } = data;
    return this.service.create({
      ...data,
      user: { connect: { id: userId } },
    });
  }

  @Get('')
  userStacks(@GetUser('id') userId: string) {
    return this.service.stacks({
      where: { userId: userId },
    });
  }

  @Get(':id')
  userStack(
    @Param('id', GetStackPipe) stack: Stack,
    @GetUser('id') userId: string,
  ) {
    return this.service.stack({ id: stack.id, userId });
  }

  @ApiBody(apiBody)
  @Patch(':id')
  async update(
    @Param('id', GetStackPipe) stack: Stack,
    @Body() data: UpdateStackDto,
    @GetUser('id') userId: string,
  ) {
    return await this.service.update({
      where: { id: stack.id, userId },
      data: {
        ...data,
      },
    });
  }

  @Delete(':id')
  async remove(
    @Param('id', GetStackPipe) stack: Stack,
    @GetUser('id') userId: string,
  ) {
    return this.service.delete({ id: stack.id, userId });
  }
}
