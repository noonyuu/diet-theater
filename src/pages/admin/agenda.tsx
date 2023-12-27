import { useEffect, useState } from "react";
import { getPostData } from "../../hooks/getOriginal";
import { Form } from "../../component/form";
import { FaSearch } from "react-icons/fa";
import { Button } from "../../component/button";

export const Agenda = () => {
  const [api, setApi] = useState<Map<string, any>>(new Map());
  const [speaker, setSpeaker] = useState<any[]>([]);

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
    <div>
      <div>
        <p className="pt-8 text-center font-bold">
          新規作成する議題を選んでください
        </p>
        <div className="my-4 flex justify-center">
          <Form title="議題名" />
          <Button
            name={<FaSearch />}
            color="bg-white text-black"
            action=""
            decoration="rounded-lg border border-black"
          />
        </div>
      </div>
      <div className="overflow-x-auto p-4">
        <table className="table text-center">
          {/* head */}
          <thead>
            <tr>
              <th>国会回次</th>
              <th>院名</th>
              <th>会議名</th>
              <th>号数</th>
              <th>実施年月</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(api).map(([keys, values]) => {
              const pickData = new Map(Object.entries(values));
              return (
                <tr key={keys}>
                  <td>
                    <>第{pickData.get("session")}回</>
                  </td>
                  <td>
                    <>{pickData.get("nameOfHouse")}</>
                  </td>
                  <td>
                    <>{pickData.get("nameOfMeeting")}</>
                  </td>
                  <td>
                    <>第{pickData.get("session")}号</>
                  </td>
                  <td>
                    <>{pickData.get("date")}</>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
