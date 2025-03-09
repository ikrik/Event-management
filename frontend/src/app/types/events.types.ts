import { ReactNode } from 'react';

export enum EventType {
  reef = 'Reef',
  grandOpenParty = 'Grand Opening Party',
  festival = 'Festival',
  concert = 'Concert',
}

export interface EventItem {
  id: string;
  eventType: EventType;
  venue: string;
  location: string;
  date: string;
  capacity: number;
}

export interface Pagination {
  page?: number;
  pageSize?: number;
  total?: number;
}

export interface ListResponse<T> {
  data: T[];
  metadata: Required<Pagination>;
}

export type FormattedEventItem = EventItem & Record<string, ReactNode>;

export interface UpdateEventsProps {
  newEvents: FormattedEventItem[];
  newPagination: Required<Pagination>;
  error: Error | undefined;
}

export interface QueryParams {
  searchLocation: string;
  page: number;
  UUID: string;
}
