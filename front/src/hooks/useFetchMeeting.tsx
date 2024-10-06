import useSWR from "swr";

interface Meeting {
  ID: number;
  IssueID: string;
  Session: number;
  Issue: string;
  NameOfHouse: string;
  NameOfMeeting: string;
  Date: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
}

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
