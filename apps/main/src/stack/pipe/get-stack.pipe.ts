import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { StackService } from '..';

@Injectable()
export class GetStackPipe implements PipeTransform {
  constructor(private readonly service: StackService) {}

  async transform(id: number) {
    const stack = await this.service.stack({ id });

    if (!stack) {
      throw new NotFoundException('Stack not found');
    }

    return stack;
  }
}
