import { Module } from '@nestjs/common';
import { ContactService } from './service';
import { ContactResolver } from './resolver';

@Module({
  providers: [ContactService, ContactResolver],
})
export class ContactModule {}
