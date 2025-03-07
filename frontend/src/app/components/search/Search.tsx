'use client';
import useDebounce from '@hooks/useDebounce';
import SearchIcon from '@images/search';
import { ChangeEvent, FC, ReactNode, useEffect, useState } from 'react';
import useFetch from '@hooks/useFetch';
import CloseIcon from '@images/close';
import { EventItem } from 'types/events.types';

interface SearchProps {
  updateEvents: (events: (EventItem & Record<string, ReactNode>)[]) => void;
}

export const Search: FC<SearchProps> = ({ updateEvents }) => {
  const [query, setQuery] = useState<string>('');
  const [callValue, setCallValue] = useState<string | null>(null);
  const [value, setValue] = useState<string>('');
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState<boolean>(false);
  const [autocompleteQuery, setAutocompleteQuery] = useState<string | null>(null);
  const debouncedQuery = useDebounce<string>(query, 600);

  const { data, isError } = useFetch<string[]>(
    `events/autocomplete?query=${autocompleteQuery}`,
    typeof autocompleteQuery === 'string',
  );
  const { data: eventsData } = useFetch<(EventItem & Record<string, ReactNode>)[]>(
    `events/search?location=${callValue}`,
    typeof callValue !== null,
  );

  // User starts typing
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setValue(e.target.value);
  };

  // The updated query triggers debounce hook
  useEffect(() => {
    handleSearch(debouncedQuery);
  }, [debouncedQuery]);

  // Debounce change calls handleSearch
  const handleSearch = async (query: string) => {
    if (typeof callValue === 'string') {
      setCallValue('');
    }
    if (query.length > 0 && query.length < 3) return;

    setAutocompleteQuery(query);
  };

  // In case the query was more that 2, it triggers the useSWR to fetch
  // Possible locations based on the written text in the search box
  useEffect(() => {
    // Available options for selection
    setIsSuggestionsVisible(!!(data && data.length > 0));
  }, [data, isError]);

  // The user clicks one of the selections
  const handleSuggestionClick = (suggestion: string) => {
    setIsSuggestionsVisible(false);
    setValue(suggestion);
    setCallValue(suggestion);
  };

  // When fetched events are available, we send them to the parent component
  // through updateEvents to show them inside the dataTable component
  useEffect(() => {
    if (eventsData) {
      updateEvents(eventsData || []);
    }
  }, [eventsData]);

  // Reset
  const handleReset = () => {
    setQuery('');
    setValue('');
    setCallValue('');
    setIsSuggestionsVisible(false);
    setAutocompleteQuery(null);
  };

  return (
    <div className="relative flex items-center rounded min-w-[360px] bg-zinc-700 max-w-[400px] h-11">
      <div className="pl-2">
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder="Search events..."
        className="outline-0 hover:outline-0 p-2 w-full placeholder:italic placeholder:text-white-400"
        value={value}
        onChange={handleInputChange}
      />
      {query?.length > 0 && (
        <div className="pr-2">
          <button onClick={handleReset}>
            <CloseIcon />
          </button>
        </div>
      )}
      {isSuggestionsVisible && (
        <div className="absolute top-full left-0 w-full bg-white text-black mt-2 p-2 rounded">
          {data?.map((locations) => (
            <div
              key={locations}
              className="p-2 cursor-pointer hover:bg-gray-300"
              onClick={handleSuggestionClick.bind(this, locations)}>
              {locations}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
