import useSWR from "swr";
import { Speech } from "../types/speech";

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json() as Promise<Speech[] | null>);
}

export const useFetchSpeech = (
  url: string,
): {
  speech: Speech[] | null | undefined;
  error: any;
  isLoading: boolean;
} => {
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    speech: data,
    error: error,
    isLoading: isLoading,
  };
};
