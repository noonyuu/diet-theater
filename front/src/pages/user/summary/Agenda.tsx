import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// fail to import
import { getPostData } from "../../../hooks/getOriginal";
import { Form } from "../../../component/form";
import { Button } from "../../../component/button";
import { MdiChat } from "../../../assets/Chat";

// アイコン
// import { FaSearch } from "react-icons/fa";

export const Agenda = () => {
  const navigate = useNavigate();

  const [api, setApi] = useState<Map<string, any>>(new Map());
  const [speaker, setSpeaker] = useState<any[]>([]);

  interface Entity {
    detailId: string;
  }

  const detail = (val: string) => {
    const entity: Entity = {
      detailId: val,
    };
    navigate("/chat", { state: entity });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getPostData();
        const speakers = newData?.get("speechRecord");
        console.log("agenda", newData);

        if (newData !== null) {
          setApi(newData);
          setSpeaker(speakers);
        } else {
          console.error("データが null です");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    // pt-[5%]は仮置き
    <main className="mt-16 flex-1 bg-bac-main">
      <section className="h-full font-meiryo">
        {/* <div>
          <p className="pt-[10%] text-center text-lg font-bold">
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
        <div className="overflow-x-auto p-4">
          <table className="table mx-auto bg-white shadow-md shadow-slate-200 lg:w-2/3">
            {/* head */}
            <thead className="bg-main-color">
              <tr className="text-center text-base">
                <th className="rounded-tl-xl text-white lg:table-cell lg:min-w-[10%]">
                  国会回次
                </th>
                <th className="lg:table-cel max-w-[10%] text-white lg:min-w-[10%]">
                  院名
                </th>
                <th className="w-[60%] text-white lg:w-[30%]">会議名</th>
                <th className="hidden text-white lg:table-cell lg:min-w-[10%]">
                  号数
                </th>
                <th className="hidden text-white lg:table-cell lg:min-w-[10%]">
                  実施年月
                </th>
                <th className="max-w-[20%] rounded-tr-xl lg:min-w-[20%]"></th>
              </tr>
            </thead>
            <tbody>
              {Array.from(api).map(([keys, values]) => {
                const pickData = new Map(Object.entries(values));
                return (
                  <tr key={keys} className="text-center">
                    <td className="rounded-bl-xl lg:table-cell">
                      <>第{pickData.get("session")}回</>
                    </td>
                    <td className="p-0 text-center">
                      <>{pickData.get("nameOfHouse")}</>
                    </td>
                    <td className="lg:text:lg md:text-md p-0 text-center text-xs">
                      <>{pickData.get("nameOfMeeting")}</>
                    </td>
                    <td className="hidden lg:table-cell">
                      <>第{pickData.get("session")}号</>
                    </td>
                    <td className="hidden lg:table-cell">
                      <>{pickData.get("date")}</>
                    </td>
                    <td className="rounded-br-xl">
                      <button
                        type="button"
                        className="flex items-center rounded-full bg-sub_blue p-2"
                        onClick={() => detail(keys)}
                      >
                        <MdiChat />
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
