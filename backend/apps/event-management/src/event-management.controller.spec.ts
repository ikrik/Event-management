import { Test, TestingModule } from '@nestjs/testing';
import { EventManagementController } from './event-management.controller';
import { EventManagementService } from './event-management.service';
import { CreateEventDto, UpdateEventDto } from '@app/contracts/events';
import { EventType } from 'types/reusable.types';

describe('EventManagementController', () => {
  let eventManagementController: EventManagementController;
  let eventManagementService: EventManagementService;

  beforeEach(async () => {
    const mockEventService = {
      findAllEvents: jest.fn().mockReturnValue([
        {
          id: '1',
          eventType: EventType.festival,
          venue: 'My Test',
          location: 'Athens',
          date: new Date('5/12/2025'),
          capacity: 34290,
        },
      ]),
      createEvent: jest.fn().mockImplementation(function (dto: CreateEventDto) {
        return {
          id: '2',
          ...dto,
        };
      }),
      updateEvent: jest.fn().mockImplementation((id: string, dto: UpdateEventDto) => ({
        id,
        ...dto,
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventManagementController],
      providers: [{ provide: EventManagementService, useValue: mockEventService }],
    }).compile();

    eventManagementController = module.get<EventManagementController>(EventManagementController);
    eventManagementService = module.get<EventManagementService>(EventManagementService);
  });

  it(`should return all events`, () => {
    expect(eventManagementController.findAll()).toEqual([
      {
        id: '1',
        eventType: EventType.festival,
        venue: 'My Test',
        location: 'Athens',
        date: new Date('5/12/2025'),
        capacity: 34290,
      },
    ]);
    expect(jest.spyOn(eventManagementService, 'findAllEvents')).toHaveBeenCalled();
  });

  it(`should create a new event`, () => {
    const createDto: CreateEventDto = {
      eventType: EventType.concert,
      venue: 'My Venue',
      location: 'Berlin',
      date: new Date('10/12/2024'),
      capacity: 1290,
    };
    expect(eventManagementController.create(createDto)).toEqual({
      id: '2',
      eventType: EventType.concert,
      venue: 'My Venue',
      location: 'Berlin',
      date: new Date('10/12/2024'),
      capacity: 1290,
    });
    expect(jest.spyOn(eventManagementService, 'createEvent')).toHaveBeenCalledWith(createDto);
  });

  it(`should update an event`, () => {
    const updateDto: UpdateEventDto & { id: string } = {
      id: '1',
      venue: 'My Test 2',
      capacity: 38290,
    };
    expect(eventManagementController.update(updateDto)).toEqual({
      id: '1',
      venue: 'My Test 2',
      capacity: 38290,
    });
    expect(jest.spyOn(eventManagementService, 'updateEvent')).toHaveBeenCalledWith('1', {
      venue: 'My Test 2',
      capacity: 38290,
    });
  });
});
