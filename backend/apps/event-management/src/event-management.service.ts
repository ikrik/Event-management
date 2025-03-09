import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateEventDto, UpdateEventDto, EventDto } from '@app/contracts/events';
import { events } from './mock/events';
import { ListResponseDto } from '@app/contracts/list-response.dto';
import { ListRequestDto } from '@app/contracts/list-request.dto';

@Injectable()
export class EventManagementService {
  private events: EventDto[] = events;

  createEvent(event: CreateEventDto): EventDto {
    const newEvent: EventDto = {
      ...event,
      date: new Date(event.date),
      id: uuidv4(),
    };

    this.events.unshift(newEvent);
    return newEvent;
  }

  updateEvent(id: string, event: UpdateEventDto): EventDto {
    const index = this.events.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new Error('Event not found');
    }
    this.events[index] = { ...this.events[index], ...event };
    return this.events[index];
  }

  searchEvent(): string {
    return 'Event found!';
  }

  findAllEvents({ page = 1, pageSize = 5, searchLocation = '' }: ListRequestDto): ListResponseDto<EventDto> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const filteredEvents =
      searchLocation?.length > 0
        ? this.events.filter((event) => event.location.toLowerCase() === searchLocation.toLowerCase())
        : this.events;
    const total = filteredEvents.length;
    const actualEvents = filteredEvents.slice(startIndex, endIndex);

    return {
      metadata: {
        page,
        pageSize,
        total: total,
      },
      data: actualEvents,
    };
  }

  findLatestEvent(): { event: EventDto | null } {
    if (this.events.length === 0) return { event: null };

    return {
      event: this.events.reduce((latest, event) => {
        return event.date > latest.date ? event : latest;
      }),
    };
  }

  searchAutocomplete(location: string): string[] {
    if (location.length < 3) return [];

    return [
      ...new Set(
        this.events
          .filter((event) => event.location.toLowerCase().includes(location.toLowerCase()))
          .map((item) => item.location),
      ),
    ];
  }
}
