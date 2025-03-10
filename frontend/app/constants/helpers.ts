import { EventFormData } from '@components/dataTable/components/editableRow/hooks/eventSchema.types';
import { EventType } from 'types/events.types';

export const INITIAL_FORM = {
  eventType: EventType.reef,
  date: '',
  venue: '',
  location: '',
} as EventFormData;

export const headers = {
  id: '',
  eventType: 'Event Type',
  location: 'Location',
  venue: 'Venue',
  date: 'Date',
  capacity: 'Capacity',
};

export const extraStyles = {
  eventType: 'font-bold',
  venue: 'font-bold',
};

export const iconsPerKey = {
  location: 'location',
  date: 'time',
  capacity: 'users',
};

export const EventTypeEnumOptions: EventType[] = [
  EventType.reef,
  EventType.grandOpenParty,
  EventType.festival,
  EventType.concert,
];
