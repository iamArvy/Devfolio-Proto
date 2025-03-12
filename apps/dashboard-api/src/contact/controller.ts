import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './service';
import { GetUser } from '@app/shared/decorator';
import { Contact } from '@prisma/client';
import { JwtGuard } from '../auth/guard';
import { CreateContactDto, UpdateContactDto } from './dto';
import { GetContactPipe } from './pipe';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('contact')
export class ContactController {
  constructor(private readonly service: ContactService) {}
  @Post('')
  async create(@Body() data: CreateContactDto, @GetUser('id') userId: string) {
    // const { role, description, value } = data;
    return this.service.create({
      ...data,
      user: { connect: { id: userId } },
    });
  }

  @Get('')
  userContacts(@GetUser('id') userId: string) {
    return this.service.contacts({
      where: { userId: userId },
    });
  }

  @Get(':id')
  userContact(
    @Param('id', GetContactPipe) contact: Contact,
    @GetUser('id') userId: string,
  ) {
    return this.service.contact({ id: contact.id, userId });
  }

  @Patch(':id')
  async update(
    @Param('id', GetContactPipe) contact: Contact,
    @Body() updateProjectDto: UpdateContactDto,
    @GetUser('id') userId: string,
  ) {
    return await this.service.update({
      where: { id: contact.id, userId },
      data: {
        ...updateProjectDto,
      },
    });
  }

  @Delete(':id')
  async remove(
    @Param('id', GetContactPipe) contact: Contact,
    @GetUser('id') userId: string,
  ) {
    return this.service.delete({ id: contact.id, userId });
  }
}
