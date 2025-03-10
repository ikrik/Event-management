/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import useSWR from 'swr';
import { fetcher } from '@utils/fetcher';

export default function useFetch<T>(path: string, shouldFetch = true) {
  const { data, error, isLoading } = useSWR<T, Error>(
    shouldFetch ? `/api/${path}` : null,
    (url: string) => fetcher(url, 'GET'),
    { revalidateIfStale: true },
  );

  // Function to make a mutation (POST, PUT)
  const sendRequest = async (method: 'POST' | 'PUT', body: any) => {
    try {
      const response = await fetcher(`/api/${path}`, method, body);
      return response;
    } catch (err) {
      throw err;
    }
  };

  return {
    data,
    isLoading: isLoading || (!data && !error),
    isError: error,
    sendRequest,
  };
}
