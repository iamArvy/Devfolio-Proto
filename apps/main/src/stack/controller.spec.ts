import { Test, TestingModule } from '@nestjs/testing';
import { StackController } from './controller';
import { StackService } from './service';

describe('StackController', () => {
  let controller: StackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StackController],
      providers: [StackService],
    }).compile();

    controller = module.get<StackController>(StackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
