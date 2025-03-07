import Home from '@components/home/Home';
import InitialFetchEvents from '../services/InitialFetchEvents';

export default async function HomePage() {
  const res = await InitialFetchEvents();

  if (!res.events) {
    return (
      <div className="flex justify-between">
        <div className="flex-initial w-1/2">
          <h1 className="text-4xl font-bold pb-3">Oops! Something went wrong in the server...</h1>
        </div>
      </div>
    );
  }

  return <Home initialEvents={res?.events.data} initPagination={res?.events.metadata} />;
}
