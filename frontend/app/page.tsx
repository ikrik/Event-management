import Home from '@components/home/Home';
import { fetcher } from '@utils/fetcher';
import { CURRENT_URL } from '@constants/endpoints';
import { FormattedEventItem, ListResponse } from 'types/events.types';
import { formatDate } from '@utils/helpers';

export default async function HomePage() {
  const res: ListResponse<FormattedEventItem> = await fetcher(`${CURRENT_URL}/api/events`);

  if (!res || !res.data) {
    return (
      <div className="flex justify-between">
        <div className="flex-initial w-1/2">
          <h1 className="text-4xl font-bold pb-3">Oops! Something went wrong in the server...</h1>
        </div>
      </div>
    );
  }

  const events = res.data.map((item: FormattedEventItem) => ({
    ...item,
    date: formatDate(item.date),
  }));

  return <Home initialEvents={events} initPagination={res?.metadata} />;
}
