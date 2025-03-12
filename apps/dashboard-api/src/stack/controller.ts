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
import { CreateDto, UpdateDto } from './dto';
import { Stack } from '@prisma/client';
import { JwtGuard } from '../auth/guard';
import { GetStackPipe } from './pipe';

@UseGuards(JwtGuard)
@Controller('stack')
export class StackController {
  constructor(private readonly service: StackService) {}
  @Post('')
  async create(@Body() data: CreateDto, @GetUser('id') userId: string) {
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

  @Patch(':id')
  async update(
    @Param('id', GetStackPipe) stack: Stack,
    @Body() data: UpdateDto,
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
