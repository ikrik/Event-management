'use client';

import { Button } from '@components/button/Button';
import useFetch from '@hooks/useFetch';
import { EventItem } from 'types/events.types';

const RecentEvent = () => {
  const { data, isLoading, isError } = useFetch<{ event: EventItem | null }>('events/latest');
  const recentEvent = data?.event;

  const handleViewEvent = () => {
    alert('Not sure what this action does!');
  };

  return (
    <div className="p-6 bg-neutral-700 rounded-md">
      <h2 className="text-white text-3xl font-bold mb-4">Recent Event</h2>

      {isLoading && !isError && (
        <div className="w-full text-center">
          <h3 className="py-4 mb-4 text-2xl">Loading...</h3>
        </div>
      )}

      {!isLoading && isError && (
        <div className="w-full text-center">
          <h3 className="py-4 mb-4 text-2xl">Something went wrong!</h3>
        </div>
      )}

      {!isLoading && !isError && recentEvent && (
        <div className="min-h-56 flex flex-col justify-end">
          <p className="text-white text-lg mb-4">{recentEvent.eventType}</p>
          <p className="text-white text-lg mb-4">{recentEvent.venue}</p>
          <div className="flex-initial">
            <Button
              onClick={handleViewEvent}
              classes="bg-white text-black font-bold hover:bg-gray-200 transition-colors">
              View Events
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentEvent;
