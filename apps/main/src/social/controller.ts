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
import { SocialService } from './service';
import { GetUser } from '@app/shared/decorator';
import { Social } from '@prisma/client';
import { CreateSocialDto, UpdateSocialDto } from './dto';
import { GetSocialPipe } from './pipe';
import { JwtGuard } from '../auth/guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

const apiBody = {
  schema: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        example: 'https://linkedin.com/oluwaseyioke-webdev',
        description: 'The url to the user social profile',
      },
      icon: {
        type: 'string',
        example: 'logos:linkedin',
        description: 'The name of icon for the social media using Iconify',
      },
      name: {
        type: 'string',
        example: 'LinkedIn',
        description: 'The name of the social media',
      },
      value: {
        type: 'string',
        example: 'Oluwaseyi Oke',
        description: 'The text value for the social media account',
      },
    },
  },
};

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('social')
export class SocialController {
  constructor(private readonly service: SocialService) {}

  @ApiBody(apiBody)
  @Post('')
  async create(@Body() data: CreateSocialDto, @GetUser('id') userId: string) {
    // const { role, description, value } = data;
    return this.service.create({
      ...data,
      user: { connect: { id: userId } },
    });
  }

  @Get('')
  userSocials(@GetUser('id') userId: string) {
    return this.service.socials({
      where: { userId: userId },
    });
  }

  @Get(':id')
  userSocial(
    @Param('id', GetSocialPipe) social: Social,
    @GetUser('id') userId: string,
  ) {
    return this.service.social({ id: social.id, userId });
  }

  @ApiBody(apiBody)
  @Patch(':id')
  async update(
    @Param('id', GetSocialPipe) social: Social,
    @Body() data: UpdateSocialDto,
    @GetUser('id') userId: string,
  ) {
    return await this.service.update({
      where: { id: social.id, userId },
      data: {
        ...data,
      },
    });
  }

  @Delete(':id')
  async remove(
    @Param('id', GetSocialPipe) social: Social,
    @GetUser('id') userId: string,
  ) {
    return this.service.delete({ id: social.id, userId });
  }
}
