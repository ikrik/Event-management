import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { EVENTS_MANAGEMENT_CLIENT } from './constants';

describe('EventsService', () => {
  let service: EventsService;

  const mockClientProxy = {
    send: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: EVENTS_MANAGEMENT_CLIENT,
          useValue: mockClientProxy,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
