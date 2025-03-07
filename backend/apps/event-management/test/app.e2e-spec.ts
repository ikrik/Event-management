import { Test, TestingModule } from '@nestjs/testing';
import { INestMicroservice } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { EventManagementModule } from '../src/event-management.module';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { EVENTS_PATTERNS } from 'libs/contracts/src/events/events.patterns';
import { CreateEventDto, EventDto } from 'libs/contracts/src/events';
import { lastValueFrom } from 'rxjs';
import { EventType } from 'types/reusable.types';

describe('EventManagementController (e2e)', () => {
  let app: INestMicroservice;
  let client: ClientProxy;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [EventManagementModule],
    }).compile();

    app = moduleFixture.createNestMicroservice<MicroserviceOptions>({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3004,
      },
    });

    await app.listen();

    client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3004,
      },
    });
  });

  afterEach(async () => {
    await app.close();
    client.close();
  });

  it('should handle FIND_ALL message', async () => {
    const findAll = client.send<EventDto[]>(EVENTS_PATTERNS.FIND_ALL, {});
    const response = await lastValueFrom(findAll);

    expect(response).toBeDefined();
    expect(Array.isArray(response)).toBeTruthy();
  });

  it('should handle CREATE message', async () => {
    const createPayload: CreateEventDto = {
      venue: 'Test Event',
      eventType: EventType.concert,
      location: 'Berlin',
      date: new Date('20/11/2024'),
      capacity: 1980,
    };

    const create = client.send<EventDto>(EVENTS_PATTERNS.CREATE, createPayload);
    const response = await lastValueFrom(create);

    expect(response).toBeDefined();
    expect(response.venue).toEqual(createPayload.venue);
    expect(response.capacity).toEqual(createPayload.capacity);
    expect(response.eventType).toEqual('Concert');
  });

  it('should handle UPDATE message', async () => {
    const updatePayload = {
      id: '1',
      venue: 'Updated Venue',
      capacity: 87000,
    };

    const update = client.send<EventDto>(EVENTS_PATTERNS.UPDATE, updatePayload);
    const response = await lastValueFrom(update);

    expect(response).toBeDefined();
    expect(response.venue).toEqual(updatePayload.venue);
    expect(response.capacity).toEqual(updatePayload.capacity);
  });
});
