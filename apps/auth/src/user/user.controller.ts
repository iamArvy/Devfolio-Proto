import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateEmailDto, UpdatePasswordDto } from '../dto';
import { JwtAuthGuard } from '@app/shared/guards';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('health')
  health() {
    return 'OK';
  }

  @Post('update_email')
  updateUserEmail(
    @Request() req: { user: string },
    @Body() data: UpdateEmailDto,
  ) {
    return this.service.update({
      where: {
        id: req.user,
      },
      data: {
        email: data.email,
      },
    });
  }

  @Post('update_password')
  updateUserPassword(
    @Request() req: { user: string },
    @Body() data: UpdatePasswordDto,
  ) {
    return this.service.updatePassword(req.user, data);
  }

  @Post('delete')
  removeProfile(@Request() req: { user: string }) {
    return this.service.delete({
      id: req.user,
    });
  }
}
