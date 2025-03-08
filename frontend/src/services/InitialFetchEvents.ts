import { CURRENT_URL } from '@constants/endpoints';
import { fetcher } from '@utils/fetcher';
import { formatDate } from '@utils/helpers';
import { FormattedEventItem, ListResponse } from 'types/events.types';

interface InitialFetchEventsItem {
  events?: ListResponse<FormattedEventItem>;
  error?: Error;
}

const InitialFetchEvents = async (): Promise<InitialFetchEventsItem> => {
  const response: InitialFetchEventsItem = { events: undefined, error: undefined };

  try {
    const eventsData: ListResponse<FormattedEventItem> = await fetcher(`${CURRENT_URL}/api/events`);
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
