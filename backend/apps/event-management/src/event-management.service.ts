import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateEventDto, UpdateEventDto, EventDto } from '@app/contracts/events';
import { events } from './mock/events';

@Injectable()
export class EventManagementService {
  private events: EventDto[] = events;

  createEvent(event: CreateEventDto): EventDto {
    const newEvent: EventDto = {
      ...event,
      id: uuidv4(),
    };

    this.events.push(newEvent);
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

  findAllEvents(): EventDto[] {
    return this.events;
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

  searchEvents(location: string): EventDto[] {
    return !location
      ? this.events
      : this.events.filter((event) => event.location.toLowerCase() === location.toLowerCase());
  }
}
