// Prize hook to fetch the prize data from the api
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export function usePrizes() {
  const { data, error } = useSWR('/api/getPrize', fetcher);

  return {
    prizes: data,
    isLoading: !error && !data,
    isError: error,
  };
}