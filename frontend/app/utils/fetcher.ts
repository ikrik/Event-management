/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetcher(url: string, method: string = 'GET', body?: any) {
  const options: RequestInit = {
    method,
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  };
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`API request failed with status: ${res.status}`);
  }
  return res.json();
}
