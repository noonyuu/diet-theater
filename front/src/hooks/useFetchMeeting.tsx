import useSWR from "swr";
import { Meeting } from "../types/meeting";

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json() as Promise<Meeting[] | null>);
}

export const useFetchMeeting = (
  url: string,
): {
  meeting: Meeting[] | null | undefined;
  error: any;
  isLoading: boolean;
} => {
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    meeting: data,
    error: error,
    isLoading: isLoading,
  };
};
