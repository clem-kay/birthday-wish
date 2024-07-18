import { Test, TestingModule } from '@nestjs/testing';
import { WishesGateway } from './wishes.gateway';

describe('WishesGateway', () => {
  let gateway: WishesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WishesGateway],
    }).compile();

    gateway = module.get<WishesGateway>(WishesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
