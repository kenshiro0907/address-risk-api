import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from '../src/address/address.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Address } from '../src/address/address.entity';

describe('AddressService', () => {
  let service: AddressService;

  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(Address),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
