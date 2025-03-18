import { Module } from '@nestjs/common';
import { StackService } from './service';
import { StackController } from './controller';

@Module({
  controllers: [StackController],
  providers: [StackService],
  // exports: [StackService], // Export the service
})
export class StackModule {}
