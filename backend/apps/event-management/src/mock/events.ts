import { EventDto } from '@app/contracts/events';
import { EventType } from 'types/reusable.types';
import { v4 as uuidv4 } from 'uuid';

export const events: EventDto[] = [
  {
    id: uuidv4(),
    eventType: EventType.reef,
    venue: 'Berghain',
    location: 'Berlin',
    date: new Date('2022-01-01'),
    capacity: 100,
  },
  {
    id: uuidv4(),
    eventType: EventType.grandOpenParty,
    venue: 'Pacha',
    location: 'Ibiza',
    date: new Date('2023-08-07'),
    capacity: 1200,
  },
  {
    id: uuidv4(),
    eventType: EventType.festival,
    venue: 'Release Festival 2025',
    location: 'Athens',
    date: new Date('2025-06-14'),
    capacity: 22300,
  },
  {
    id: uuidv4(),
    eventType: EventType.festival,
    venue: 'Eject Festival 2025',
    location: 'Athens',
    date: new Date('2025-07-01'),
    capacity: 14300,
  },
  {
    id: uuidv4(),
    eventType: EventType.festival,
    venue: 'Hellfest',
    location: 'Clison',
    date: new Date('2025-06-18'),
    capacity: 2300,
  },
  {
    id: uuidv4(),
    eventType: EventType.festival,
    venue: 'Punks no Dead Fest.',
    location: 'Athens',
    date: new Date('2025-07-25'),
    capacity: 1300,
  },
];
