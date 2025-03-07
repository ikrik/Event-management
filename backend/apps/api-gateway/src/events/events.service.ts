import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  EVENTS_PATTERNS,
  EventDto as ClientEventDto,
  CreateEventDto as ClientCreateEventDto,
  UpdateEventDto as ClientUpdateEventDto,
} from '@app/contracts/events';
import { Observable } from 'rxjs';
import { EVENTS_MANAGEMENT_CLIENT } from './constants';
import { ListRequestDto } from '../dto/list-request.dto';

@Injectable()
export class EventsService {
  constructor(@Inject(EVENTS_MANAGEMENT_CLIENT) private eventManagement: ClientProxy) {}

  create(createEventDto: ClientCreateEventDto): Observable<ClientEventDto> {
    return this.eventManagement.send(EVENTS_PATTERNS.CREATE, createEventDto);
  }

  findAll(query: ListRequestDto): Observable<ClientEventDto[]> {
    return this.eventManagement.send(EVENTS_PATTERNS.FIND_ALL, query);
  }

  findLatest(): Observable<{ event: ClientEventDto | null }> {
    return this.eventManagement.send(EVENTS_PATTERNS.FIND_LATEST, {});
  }

  autocomplete(query: string) {
    return this.eventManagement.send(EVENTS_PATTERNS.AUTOCOMPLETE, query);
  }

  update(id: string, updateEventDto: ClientUpdateEventDto): Observable<ClientEventDto> {
    return this.eventManagement.send(EVENTS_PATTERNS.UPDATE, {
      id,
      ...updateEventDto,
    });
  }
}
