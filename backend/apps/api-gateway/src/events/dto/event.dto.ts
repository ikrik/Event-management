import { EventType } from 'types/reusable.types';

export class EventDto {
  id: string;
  eventType: EventType;
  venue: string;
  location: string;
  date: Date;
  capacity: number;
}
