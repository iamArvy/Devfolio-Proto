import { Module } from '@nestjs/common';
import { UserService } from '@app/shared/user';
import { UserController } from './controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
