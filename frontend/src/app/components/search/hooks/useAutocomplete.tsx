import useFetch from '@hooks/useFetch';
import { useState } from 'react';

const useAutocomplete = () => {
  const [autocompleteQuery, setAutocompleteQuery] = useState<string | null>(null);
  const { data, isError } = useFetch<string[]>(
    `events/autocomplete?query=${autocompleteQuery}`,
    typeof autocompleteQuery === 'string',
  );

  return {
    options: data,
    optionErrors: isError,
    onAutocompleteQueryChange: setAutocompleteQuery,
  };
};

export default useAutocomplete;
