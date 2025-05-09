import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from '../src/address/address.controller';
import { AddressService } from '../src/address/address.service';

describe('AddressController', () => {
  let controller: AddressController;

  const mockAddressService = {
    create: jest.fn(),
    findRisks: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [
        {
          provide: AddressService,
          useValue: mockAddressService,
        },
      ],
    }).compile();

    controller = module.get<AddressController>(AddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
