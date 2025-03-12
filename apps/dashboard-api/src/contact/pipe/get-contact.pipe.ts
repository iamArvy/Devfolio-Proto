import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { ContactService } from '../service';

@Injectable()
export class GetContactPipe implements PipeTransform {
  constructor(private readonly service: ContactService) {}

  async transform(id: number) {
    const contact = await this.service.contact({ id });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    return contact;
  }
}
