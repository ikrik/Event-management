import { EventType } from 'types/reusable.types';

export class CreateEventDto {
  eventType: EventType;
  venue: string;
  location: string;
  date: Date;
  capacity: number;
}
