import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// fail to import
import { getPostData } from "../../../hooks/getOriginal";
import { Form } from "../../../component/form";
import { Button } from "../../../component/button";
import { MdiChat } from "../../../assets/Chat";
import { MaterialSymbolsSearch } from "../../../assets/Search";
import axios from "axios";

// アイコン
// import { FaSearch } from "react-icons/fa";
var path = import.meta.env.VITE_APP_PATH;
export const Agenda = () => {
  const navigate = useNavigate();

  const [meetingRecord, setMeetingRecord] = useState<any[]>([]);
  const [speaker, setSpeaker] = useState<any[]>([]);

  interface Entity {
    detailId: string;
  }

  const detail = (val: string) => {
    const entity: Entity = {
      detailId: val,
    };
    navigate("/theater", { state: entity });
  };

  useEffect(() => {
    console.log("Agenda.tsx: useEffect");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://" + path + "/app/meeting-record/select/all",
          // "https://yeeeee-waaaaaa.noonyuu.com/app/speech_record/select/all",
        );

        if (Array.isArray(response.data)) {
          setMeetingRecord(response.data);
        } else {
          console.error("Unexpected response structure:", response.data);
        }

        // const newData = await getPostData();
        // const speakers = newData?.get("speechRecord");
        // console.log("agenda", newData);

        // if (newData !== null) {
        //   setApi(newData);
        //   setSpeaker(speakers);
        // } else {
        //   console.error("データが null です");
        // }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="-mb-8 mt-16 flex flex-1 justify-center bg-gray-100">
      <div className="mx-4 my-auto h-[80vh] w-full rounded-3xl bg-white p-8 shadow lg:mx-24">
        <div className="flex space-x-8 lg:space-x-24">
          <h1 className="text-lg font-bold lg:text-4xl">開演中</h1>
          <span className="flex items-center text-xs font-light lg:text-3xl">
            2024年シーズン
          </span>
        </div>

        <div className="mt-4 flex items-center rounded-md bg-white">
          <button className="px-1">
            <MaterialSymbolsSearch />
          </button>
          <input
            type="search"
            className="w-full rounded-md border-[1px] border-gray-200 bg-white p-1 focus:border-green-200 focus:outline-none"
            placeholder="検索"
          />
        </div>

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
            <tbody className="border-none">
              {meetingRecord.map((record, index) => (
                <tr
                  key={record.MeetingRecordId || index} // 修正箇所: record.MeetingRecordIdが一意でない、または存在しない場合に備えて、indexをフォールバックとして使用
                  className="border-gray-100 text-center"
                >
                  <td className="text-xs text-gray-400 lg:text-xl">
                    {record.NameOfMeeting}
                  </td>
                  <td className="hidden text-xs text-gray-400 lg:table-cell lg:text-xl">
                    {record.NameOfHouse}
                  </td>
                  <td className="hidden text-xs text-gray-400 lg:table-cell lg:text-xl">
                    {record.Date}
                  </td>
                  <td className="rounded-br-xl p-0 px-1 py-3 text-xs lg:text-lg">
                    <button
                      type="button"
                      className="mx-auto flex items-center rounded-md border-2 border-green-500 bg-green-100 px-1 py-1 text-xs text-green-500 lg:px-8"
                      onClick={() => detail(record.IssueId)}
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
    </main>
  );
};
