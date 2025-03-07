import { Controller } from '@nestjs/common';
import { EventManagementService } from './event-management.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateEventDto, UpdateEventDto, EventDto, EVENTS_PATTERNS } from '@app/contracts/events';

@Controller()
export class EventManagementController {
  constructor(private readonly eventManagementService: EventManagementService) {}

  @MessagePattern(EVENTS_PATTERNS.FIND_ALL)
  findAll(): EventDto[] {
    return this.eventManagementService.findAllEvents();
  }

  @MessagePattern(EVENTS_PATTERNS.CREATE)
  create(@Payload() createPayload: CreateEventDto): EventDto {
    return this.eventManagementService.createEvent(createPayload);
  }

  @MessagePattern(EVENTS_PATTERNS.UPDATE)
  update(@Payload() updatePayload: UpdateEventDto & { id: string }): EventDto {
    const { id, ...rest } = updatePayload;
    return this.eventManagementService.updateEvent(id, rest);
  }

  @MessagePattern(EVENTS_PATTERNS.FIND_LATEST)
  findLatest(): { event: EventDto | null } {
    return this.eventManagementService.findLatestEvent();
  }

  // New GET route for search
  @MessagePattern(EVENTS_PATTERNS.SEARCH)
  search(@Payload() location: string): EventDto[] {
    return this.eventManagementService.searchEvents(location);
  }

  @MessagePattern(EVENTS_PATTERNS.AUTOCOMPLETE)
  autocomplete(@Payload() query: string): string[] {
    return this.eventManagementService.searchAutocomplete(query);
  }
}
