import { Test, TestingModule } from '@nestjs/testing';
import { PublicApiController } from './controller';
import { PublicApiService } from './service';

describe('PublicApiController', () => {
  let publicApiController: PublicApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PublicApiController],
      providers: [PublicApiService],
    }).compile();

    publicApiController = app.get<PublicApiController>(PublicApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(publicApiController.getHello()).toBe('Hello World!');
    });
  });
});
