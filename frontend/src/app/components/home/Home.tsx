'use client';
import DataTable from '@components/dataTable/DataTable';
import { DynamicDate } from '@components/dynamicDate/DynamicDate';
import { EventCreateButton } from '@components/eventCreateButton/EventCreateButton';
import RecentEvent from '@components/recentEvent/RecentEvent';
import { Search } from '@components/search/Search';
import { ReactNode, useState } from 'react';
import { EventItem, extraStyles, headers, iconsPerKey } from 'types/events.types';

export default function Home({ initialEvents }: { initialEvents: (EventItem & Record<string, ReactNode>)[] }) {
  const [filteredEvents, setFilteredEvents] = useState(initialEvents);

  const updateEvents = (newEvents: (EventItem & Record<string, ReactNode>)[]) => {
    setFilteredEvents(newEvents);
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex-initial w-1/2">
          <h1 className="text-4xl font-bold pb-3">Hello, Megan</h1>
          <DynamicDate />
        </div>
        <div className="w-1/2 flex flex-row-reverse items-center">
          <Search updateEvents={updateEvents} />
        </div>
      </div>
      <section className="mt-20 flex w-full">
        <div className="mt-4 flex-initial md:w-[85%] xl:w-2/5">
          <RecentEvent />
        </div>
      </section>
      <section className="mt-20 flex flex-col w-full">
        <div className="flex justify-end mb-4">
          <EventCreateButton />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl text-zinc-400 mb-6">Events</h3>
          <DataTable data={filteredEvents} headers={headers} extraStyles={extraStyles} iconsPerKey={iconsPerKey} />
        </div>
      </section>
    </>
  );
}
