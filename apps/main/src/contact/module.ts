import { Module } from '@nestjs/common';
import { ContactService } from './service';
import { ContactController } from './controller';

@Module({
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
