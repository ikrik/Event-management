'use client';
import useDebounce from '@hooks/useDebounce';
import SearchIcon from '@images/search';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import CloseIcon from '@images/close';
import useAutocomplete from './hooks/useAutocomplete';
import AutocompleteSuggestions from './components/autocompleteSuggestions/AutocompleteSuggestions';
import { QueryParams } from 'types/events.types';

interface SearchProps {
  updateEvents: (qry: Partial<QueryParams>, shouldCall: boolean) => void;
}

export const Search: FC<SearchProps> = ({ updateEvents }) => {
  const [query, setQuery] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState<boolean>(false);

  const { options, optionErrors, onAutocompleteQueryChange } = useAutocomplete();
  const debouncedQuery = useDebounce<string>(query, 600);

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
    if (query.length > 0 && query.length < 3) return;
    if (query.length === 0) {
      handleReset();
      return;
    }
    onAutocompleteQueryChange(query);
  };

  // In case the query was more that 2, it triggers the useSWR to fetch
  // Possible locations based on the written text in the search box
  useEffect(() => {
    // Available options for selection
    setIsSuggestionsVisible(!!(options && options.length > 0));
  }, [options, optionErrors]);

  // The user clicks one of the selections
  const handleSuggestionClick = (suggestion: string) => {
    setIsSuggestionsVisible(false);
    setValue(suggestion);
    updateEvents({ searchLocation: suggestion }, true);
  };

  // Reset
  const handleReset = () => {
    setQuery('');
    setValue('');
    setIsSuggestionsVisible(false);
    onAutocompleteQueryChange(null);
    updateEvents({ searchLocation: '' }, true);
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
      {isSuggestionsVisible && <AutocompleteSuggestions options={options} onClick={handleSuggestionClick} />}
    </div>
  );
};
