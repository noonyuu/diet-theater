import { useEffect, useState } from "react";
import { getPostData } from "../../hooks/getOriginal";
import { Form } from "../../component/form";
import { FaSearch } from "react-icons/fa";
import { Button } from "../../component/button";
import { useNavigate } from "react-router-dom";

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
        console.log(newData);

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
    <section className="bg-bac-main font-meiryo">
      <div>
        <p className="text-lg pt-10  text-center font-bold">
          {/* 新規作成する議題を選んでください */}
          議題検索
        </p>
        <div className="my-4 flex justify-center">
          <Form title="議題名" />
          {/* TODO: ここでエラーがでる */}
          <Button
            name={<FaSearch />}
            color="bg-white text-black"
            action=""
            decoration="rounded-lg border border-black"
          />
        </div>
      </div>
      <div className="overflow-x-auto p-4 ">
        <table className="table mx-auto bg-white shadow-md shadow-slate-200 lg:w-2/3">
          {/* head */}
          <thead className="bg-main-color">
            <tr className="text-base">
              <th className="hidden rounded-tl-xl lg:table-cell lg:min-w-[10%] text-white">国会回次</th>
              <th className="lg:table-cel min-w-[30%] rounded-tl-xl lg:min-w-[10%] lg:rounded-none text-white">院名</th>
              <th className="min-w-[40%] lg:min-w-[30%] text-white">会議名</th>
              <th className="hidden lg:table-cell lg:min-w-[10%] text-white">号数</th>
              <th className="hidden lg:table-cell lg:min-w-[10%] text-white">実施年月</th>
              <th className="min-w-[30%] rounded-tr-xl lg:min-w-[20%] rounded-tr-xl"></th>
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
                    <>第{pickData.get("session")}号</>
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
                      チャットを開く
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
