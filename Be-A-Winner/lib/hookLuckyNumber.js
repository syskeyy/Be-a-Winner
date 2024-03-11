import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useLuckyWinner() {
  const { data, error } = useSWR('/api/getLuckyWinner', fetcher);

  return {
    luckyNumbers: data,
    isLoading: !error && !data,
    isError: error,
  };
}