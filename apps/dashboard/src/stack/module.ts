import { Module } from '@nestjs/common';
import { StackService } from './service';
// import { StackController } from './controller';
import { StackResolver } from './resolver';

@Module({
  // controllers: [StackController],
  providers: [StackService, StackResolver],
  // exports: [StackService], // Export the service
})
export class StackModule {}
