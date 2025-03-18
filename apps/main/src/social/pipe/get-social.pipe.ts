import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { SocialService } from '../service';

@Injectable()
export class GetSocialPipe implements PipeTransform {
  constructor(private readonly service: SocialService) {}

  async transform(id: number) {
    const social = await this.service.social({ id });

    if (!social) {
      throw new NotFoundException('Social not found');
    }

    return social;
  }
}
