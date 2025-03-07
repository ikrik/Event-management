import { EventType } from 'types/reusable.types';
import { IsUUID } from 'class-validator';

export class EventDto {
  @IsUUID()
  id: string;

  eventType: EventType;
  venue: string;
  location: string;
  date: Date;
  capacity: number;
}
