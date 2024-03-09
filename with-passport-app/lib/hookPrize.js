import { useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export function usePrizes() {
  const { data, error } = useSWR("/api/getPrize", fetcher);
  const prizes = data || [];
  const finished = Boolean(data);

  console.log('Data:', data);
  console.log('Error:', error);
  console.log('Prizes:', prizes);
  console.log('Finished:', finished);

  useEffect(() => {
    if (!finished) return;
    console.log('Prizes data:', prizes);
  }, [finished, prizes]);

  return error ? null : prizes;
}