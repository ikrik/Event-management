import { FormattedEventItem, ListResponse, Pagination } from 'types/events.types';
import useFetch from './useFetch';
import { formatDate } from '@utils/helpers';

interface GetEventHookProps {
  query?: string;
  shouldFetch: boolean;
}

interface GetEventHookResponse {
  events: FormattedEventItem[] | undefined;
  pagination: Required<Pagination> | undefined;
  error: Error | undefined;
  loading: boolean;
}

const useGetEvents = ({ shouldFetch, query = '' }: GetEventHookProps): GetEventHookResponse => {
  const searchParams = query.length > 0 ? `?${query}` : '';
  const { data, isLoading, isError } = useFetch<ListResponse<FormattedEventItem>>(
    `events/${searchParams}`,
    shouldFetch,
  );

  return {
    events: data?.data.map((item) => ({ ...item, date: formatDate(item.date) })),
    pagination: data?.metadata,
    error: isError,
    loading: isLoading,
  };
};

export default useGetEvents;
