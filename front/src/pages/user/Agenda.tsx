import { useEffect, useState } from "react";
import curtain from "./curtain.png";
import { useNavigate } from "react-router-dom";
import joinCard from "./join-button.svg";
import { useFetchMeeting } from "../../hooks/useFetchMeeting";
import { Layout } from "../Layout";

var path = import.meta.env.VITE_APP_MEETING_PATH;

export const Agenda = () => {
  const navigate = useNavigate();
  const url = path + "select/all";

  const { meeting, error, isLoading } = useFetchMeeting(url);

  const [isOpenArray, setIsOpenArray] = useState(
    Array(meeting?.length).fill(false),
  );
  const [use, setUse] = useState<string[]>([]);
  interface Entity {
    IssueId: string;
    NameOfMeeting: string;
  }

  const toggleCurtain = (index: number, IssueId: string, nameOfMeeting: string) => {
    const entity: Entity = {
      IssueId: IssueId,
      NameOfMeeting: nameOfMeeting,
    };

    setIsOpenArray((prev) => {
      const newOpenArray = [...prev];
      newOpenArray[index] = !newOpenArray[index];
      return newOpenArray;
    });
    const timer = setTimeout(() => {
      // 現在のuse配列を取得
      const currentUse = JSON.parse(sessionStorage.getItem("use") || "[]");

      // 新しい値を追加
      const updatedUse = [...currentUse, entity.IssueId];

      // セッションストレージに保存
      sessionStorage.setItem("use", JSON.stringify(updatedUse));
      setUse(updatedUse); // useの状態を更新

      navigate("/theater", { state: entity });
      setIsOpenArray((prev) => {
        const newOpenArray = [...prev];
        newOpenArray[index] = !newOpenArray[index];
        return newOpenArray;
      });
      clearTimeout(timer);
    }, 1000);
  };

  useEffect(() => {
    setUse(JSON.parse(sessionStorage.getItem("use") || "[]"));
  }, []);

  return (
    <Layout>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div className="relative">
        {meeting && (
          <div className="mt-8 grid grid-cols-1 gap-4 text-black md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {meeting.map((data, index) => (
              <div key={index} className="size-96">
                <div className="relative h-3/4 overflow-hidden">
                  <div
                    style={{
                      backgroundImage: `url(${curtain})`,
                    }}
                    className={`absolute left-0 top-0 h-full w-1/2 overflow-hidden bg-cover bg-right transition-transform duration-[1500ms] ease-in-out ${
                      isOpenArray[index] ? "-translate-x-full" : ""
                    }`}
                  />
                  <div
                    style={{
                      backgroundImage: `url(${curtain})`,
                    }}
                    className={`absolute right-0 top-0 h-full w-1/2 overflow-hidden bg-cover bg-right transition-transform duration-[1500ms] ease-in-out ${
                      isOpenArray[index] ? "translate-x-full" : ""
                    }`}
                  />
                </div>
                <div className="flex h-1/4 items-center">
                  <div className="w-full flex-grow">
                    <div className="text-xl font-bold text-gray-900">
                      {data.NameOfMeeting}
                    </div>
                    <div className="text-sm">
                      {data.NameOfHouse}
                      <span className="pl-4">{data.Date}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      toggleCurtain(index, data.IssueID, data.NameOfMeeting)
                    }
                    className="mr-4"
                    disabled={isOpenArray[index]}
                  >
                    <img src={joinCard} alt="ticket-img" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};
