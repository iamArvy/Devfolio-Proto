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
import { CreateDto, UpdateDto } from './dto';
import { GetSocialPipe } from './pipe';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('social')
export class SocialController {
  constructor(private readonly service: SocialService) {}
  @Post('')
  async create(@Body() data: CreateDto, @GetUser('id') userId: string) {
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

  @Patch(':id')
  async update(
    @Param('id', GetSocialPipe) social: Social,
    @Body() data: UpdateDto,
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
