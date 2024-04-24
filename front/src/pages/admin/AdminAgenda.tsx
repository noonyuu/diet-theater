import { useEffect, useState } from "react";
import { getPostData } from "../../hooks/getOriginal";
import { Form } from "../../component/form";
import { Button } from "../../component/button";
import { useNavigate } from "react-router-dom";
// アイコン
import { MaterialSymbolsSearch } from "../../assets/Search";
import { TablerPencilPlus } from "../../assets/AddPen";
import axios from "axios";

export const AdminAgenda = () => {
  const navigate = useNavigate();

  const [api, setApi] = useState<Map<string, any>>(new Map());
  const [speaker, setSpeaker] = useState<any[]>([]);

  interface Entity {
    detailId: string;
  }

  interface MeetingRecord {
    [key: string]: any;
  }

  const detail = (val: string) => {
    const entity: Entity = {
      detailId: val,
    };
    console.log("entity", entity);
    navigate(`/secret/standby-screen/${val}`, { state: entity });
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
    <main className="mt-16 flex-1">
      <section className="bg-bac-main font-meiryo">
        {/* <div>
          <p className="pt-10 text-center  text-lg font-bold">
            議題検索
          </p>
          <div className="my-4 flex justify-center">
            <Form title="議題名" />
            <Button
              name={<MaterialSymbolsSearch />}
              color="bg-white text-black"
              action=""
              decoration="rounded-lg border border-black"
            />
          </div>
        </div> */}
        <div className="overflow-x-auto p-4 ">
          <table className="table mx-auto bg-white shadow-md shadow-slate-200 lg:w-2/3">
            {/* head */}
            <thead className="bg-main-color">
              <tr className="text-base">
                <th className="hidden rounded-tl-xl text-white lg:table-cell lg:min-w-[10%]">
                  国会回次
                </th>
                <th className="lg:table-cel min-w-[30%] rounded-tl-xl text-white lg:min-w-[10%] lg:rounded-none">
                  院名
                </th>
                <th className="min-w-[40%] text-white lg:min-w-[30%]">
                  会議名
                </th>
                <th className="hidden text-white lg:table-cell lg:min-w-[10%]">
                  号数
                </th>
                <th className="hidden text-white lg:table-cell lg:min-w-[10%]">
                  実施年月
                </th>
                <th className="min-w-[30%] rounded-tr-xl lg:min-w-[20%]"></th>
              </tr>
            </thead>
            <tbody>
              {Array.from(api).map(([keys, values]) => {
                const pickData = new Map(Object.entries(values));
                return (
                  <tr key={keys}>
                    <td className="hidden rounded-bl-xl lg:table-cell">
                      <>第{pickData.get("session")}回</>
                    </td>
                    <td className="p-0 text-center">
                      <>{pickData.get("nameOfHouse")}</>
                    </td>
                    <td className="lg:text:lg md:text-md p-0 text-center text-xs">
                      <>{pickData.get("nameOfMeeting")}</>
                    </td>
                    <td className="hidden lg:table-cell">
                      <>{pickData.get("issue")}</>
                    </td>
                    <td className="hidden lg:table-cell">
                      <>{pickData.get("date")}</>
                    </td>
                    <td className="rounded-br-xl">
                      <button
                        type="button"
                        className="flex items-center gap-3 rounded-full bg-sub_blue p-2 text-xs"
                        onClick={() => detail(keys)}
                      >
                        <TablerPencilPlus />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};
