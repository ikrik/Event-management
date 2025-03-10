/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import DataTable from '@components/dataTable/DataTable';
import { DynamicDate } from '@components/dynamicDate/DynamicDate';
import { EventCreateButton } from '@components/eventCreateButton/EventCreateButton';
import Pager from '@components/pagination/Pagination';
import RecentEvent from '@components/recentEvent/RecentEvent';
import { Search } from '@components/search/Search';
import useGetEvents from '@hooks/useGetEvents';
import { convertObjectToURLParams, isArrayEqualUnordered } from '@utils/helpers';
import { useEffect, useState } from 'react';
import { iconsPerKey, extraStyles } from '@constants/helpers';
import { FormattedEventItem, Mode, Pagination, QueryParams } from 'types/events.types';
import { v4 as uuidv4 } from 'uuid';
import { EventProvider } from './context/EventProvider';
import { ToastContainer } from 'react-toastify';

interface HomeProps {
  initialEvents: FormattedEventItem[];
  initPagination: Required<Pagination>;
}

export default function Home({ initialEvents, initPagination }: HomeProps) {
  const [query, setQuery] = useState<Partial<QueryParams>>({});
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [events, setEvents] = useState(initialEvents);
  const [pagination, setPagination] = useState(initPagination);

  const {
    events: dataEvents,
    pagination: paging,
    error,
    loading,
  } = useGetEvents({
    query: convertObjectToURLParams(query),
    shouldFetch,
  });

  const updateEvents = (qry: Partial<QueryParams>, shouldCall: boolean) => {
    setQuery((prev) => {
      if (typeof qry?.searchLocation === 'string') {
        return qry?.searchLocation ? { ...qry } : {};
      }
      return { ...prev, ...qry };
    });
    setShouldFetch(shouldCall);
  };

  useEffect(() => {
    if (dataEvents && !isArrayEqualUnordered<FormattedEventItem>(dataEvents, events, 'id') && shouldFetch) {
      setEvents(dataEvents);
    }

    if (paging && JSON.stringify(paging) !== JSON.stringify(pagination) && shouldFetch) {
      setPagination(paging);
    }
  }, [dataEvents, paging]);

  const handleMoveToPage = (page: number) => {
    updateEvents({ page }, true);
  };

  const handleAddEditEvent = (type: Mode) => {
    if (type === Mode.Add) {
      updateEvents(pagination.page === 1 ? { UUID: uuidv4() } : { page: 1 }, true);
      return;
    }
    // Mode type edit
    updateEvents({ UUID: uuidv4() }, true);
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
        <EventProvider>
          <div className="flex justify-end mb-4">
            <EventCreateButton />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl text-zinc-400 mb-6">Events</h3>
            {error ? (
              <div className="text-center">
                <h3 className="text-3xl text-zinc-200 my-10">An error occurred while fetching the Events List</h3>
              </div>
            ) : (
              <>
                <DataTable
                  loading={shouldFetch && loading}
                  data={events}
                  extraStyles={extraStyles}
                  iconsPerKey={iconsPerKey}
                  onAddEditEvent={handleAddEditEvent}
                />
                <Pager onMoveToPage={handleMoveToPage} {...pagination} />
              </>
            )}
          </div>
        </EventProvider>
      </section>
      <ToastContainer />
    </>
  );
}
