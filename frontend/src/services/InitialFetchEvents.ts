import { CURRENT_URL } from '@constants/endpoints';
import { formatDate } from '@utils/helpers';
import { FormattedEventItem, ListResponse } from 'types/events.types';

interface InitialFetchEventsItem {
  events?: ListResponse<FormattedEventItem>;
  error?: Error;
}

const InitialFetchEvents = async (): Promise<InitialFetchEventsItem> => {
  const response: InitialFetchEventsItem = { events: undefined, error: undefined };

  try {
    const res = await fetch(`${CURRENT_URL}/api/events`);
    if (!res.ok) {
      throw new Error(`API request failed with status: ${res.status}`);
    }
    const eventsData: ListResponse<FormattedEventItem> = await res.json();
    response.events = {
      ...eventsData,
      data: eventsData.data.map((item) => ({ ...item, date: formatDate(item.date) })),
    };
  } catch (error) {
    console.error('Initial event fetching unfortunately failed:', error);
    response.error = error instanceof Error ? error : new Error(String(error));
  }

  return response;
};

export default InitialFetchEvents;
