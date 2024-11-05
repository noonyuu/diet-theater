import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// アイコン
import axios from "axios";

export const TheaterCreateTable = () => {
  const navigate = useNavigate();

  const [api, setApi] = useState<Map<string, any>>(new Map());
  const [input, setInput] = useState<string>("");

  interface Entity {
    generates: any;
  }

  interface MeetingRecord {
    [key: string]: any;
  }

  const generate = (val: any) => {
    const entity: Entity = {
      generates: val,
    };
    navigate(`/secret/theater-create/${entity.generates}`);
  };

  const sendInput = () => {
    console.log("input", input);
    navigate(`/secret/theater-create/${input}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://kokkai.ndl.go.jp/api/meeting?sessionFrom=1&sessionTo=10&nameOfHouse=両院協議会&issueFrom=1&maximumRecords=5&recordPacking=json",
        );

        const kobe = await axios.get(
          "https://kokkai.ndl.go.jp/api/meeting?issueID=121305261X00920240214&recordPacking=json",
        );
        const kobeData = new Map<string, any>(Object.entries(kobe.data));
        const kobeMeetingRecord: MeetingRecord = kobeData.get("meetingRecord");
        const kobeOneData = new Map<string, any>(
          Object.entries(kobeMeetingRecord || {}),
        );

        const dataMap = new Map<string, any>(Object.entries(response.data));
        const meetingRecord: MeetingRecord = dataMap.get("meetingRecord");

        if (!meetingRecord) {
          return null;
        }

        var oneData = new Map<string, any>(Object.entries(meetingRecord || {}));

        oneData.set("5", kobeOneData.get("0"));

        console.log("AdminAgenda", oneData);
        setApi(oneData);
        return oneData;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    fetchData();
  }, []);

  return (
    <main className="-mb-8 mt-16 flex flex-1 justify-center bg-gray-100">
      <div className="mx-4 my-auto h-[80vh] w-full rounded-3xl bg-white p-8 shadow lg:mx-24">
        <div className="flex space-x-8 lg:space-x-24">
          <h1 className="text-lg font-bold lg:text-4xl">劇作成</h1>
          <span className="flex items-center text-xs font-light lg:text-3xl">
            2024年シーズン
          </span>
        </div>

        <div className="mt-4 flex items-center rounded-md bg-white">
          <button className="px-1" onClick={() => sendInput()}>
            検索
          </button>
          <input
            type="search"
            className="w-full rounded-md border-[1px] border-gray-200 bg-white p-1 focus:border-green-200 focus:outline-none"
            placeholder="issue id"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </div>

        <div className="mt-4 lg:mt-10">
          <table className="table mx-auto w-full rounded-b-none bg-white">
            <thead className="">
              <tr className="border-gray-100 text-center text-base">
                <th className="w-5/6 text-xs text-gray-400 lg:w-3/6 lg:text-xl">
                  議題
                </th>
                <th className="lg:ta jble-cell hidden w-1/6 text-xs text-gray-400 lg:text-xl">
                  政党
                </th>
                <th className="hidden w-1/6 text-xs text-gray-400 lg:table-cell lg:text-xl">
                  日付
                </th>
                <th className="w-[(0.5/6)%] text-xs text-gray-400 lg:text-xl">
                  作成状況
                </th>
                <th className="w-[(0.5/6)%] text-xs text-gray-400 lg:text-xl"></th>
              </tr>
            </thead>
            <tbody className="border-none">
              {Array.from(api).map(([keys, values]) => {
                const pickData = new Map(Object.entries(values));
                return (
                  <tr key={keys} className="border-gray-100 text-center">
                    <td className="p-0 text-center text-xs font-thin lg:text-lg">
                      <>{pickData.get("nameOfMeeting")}</>
                    </td>
                    <td className="hidden p-0 text-center text-xs lg:table-cell lg:text-lg">
                      <>{pickData.get("nameOfHouse")}</>
                    </td>
                    <td className="hidden p-0 text-center text-xs lg:table-cell lg:text-lg">
                      <>{pickData.get("date")}</>
                    </td>
                    <td className="rounded-br-xl p-0 px-1 py-3 text-xs lg:text-lg">
                      <button
                        type="button"
                        className="mx-auto flex items-center justify-center rounded-md border-2 border-green-500 bg-green-100 px-1 py-1 text-xs text-green-500 lg:w-24"
                        onClick={() => generate(pickData.get("issueID"))}
                      >
                        GENERATE
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
