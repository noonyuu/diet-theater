import { Layout } from "../Layout";
import { useFetchMeeting } from "../../hooks/useFetchMeeting";
import { useNavigate } from "react-router-dom";

var path = import.meta.env.VITE_APP_MEETING_PATH;

interface Entity {
  IssueId: string;
}

export const Agenda = () => {
  const navigate = useNavigate();
  const url = path + "select/all";
  const { meeting, error, isLoading } = useFetchMeeting(url);

  const join = (IssueId: string) => {
    const entity: Entity = {
      IssueId: IssueId,
    };
    navigate("/theater", { state: entity });
  };
  console.log(meeting);
  return (
    <Layout>
      {/* TODO: ローディングインディケータをちゃんと作る */}
      {isLoading && <div>Loading...</div>}
      {!error && <div>{error}</div>}
      {meeting && (
        <div>
          <div className="mt-4 max-h-[80%] overflow-y-auto lg:mt-10">
            <table className="table mx-auto w-full rounded-b-none bg-white">
              <thead className="">
                <tr className="border-gray-100 text-center text-base">
                  <th className="w-5/6 text-xs text-gray-400 lg:w-3/6 lg:text-xl">
                    議題
                  </th>
                  <th className="hidden w-1/6 text-xs text-gray-400 lg:table-cell lg:text-xl">
                    政党
                  </th>
                  <th className="hidden w-1/6 text-xs text-gray-400 lg:table-cell lg:text-xl">
                    日付
                  </th>
                  <th className="w-1/6 text-xs text-gray-400 lg:text-xl"></th>
                </tr>
              </thead>
              <tbody>
                {meeting.map((m) => (
                  <tr key={m.ID}>
                    <td className="text-xs text-gray-400 lg:text-xl">
                      {m.NameOfMeeting}
                    </td>
                    <td className="hidden text-xs text-gray-400 lg:table-cell lg:text-xl">
                      {m.NameOfHouse}
                    </td>
                    <td className="hidden text-xs text-gray-400 lg:table-cell lg:text-xl">
                      {m.Date}
                    </td>
                    <td className="rounded-br-xl p-0 px-1 py-3 text-xs lg:text-lg">
                      <button
                        type="button"
                        className="mx-auto flex items-center rounded-md border-2 border-green-500 bg-green-100 px-1 py-1 text-xs text-green-500 lg:px-8"
                        onClick={() => join(m.IssueID)}
                      >
                        入場
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
};
