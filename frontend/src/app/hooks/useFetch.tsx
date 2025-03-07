'use client';

import useSWR from 'swr';
import { fetcher } from '@utils/fetcher';

export default function useFetch<T>(path: string, shouldFetch = true) {
  const { data, error, isLoading } = useSWR<T, Error>(shouldFetch ? `/api/${path}` : null, fetcher);

  return {
    data,
    isLoading: isLoading || (!data && !error),
    isError: error,
  };
}
