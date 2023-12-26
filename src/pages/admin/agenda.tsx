import { useEffect, useState } from "react"
import { getPostData } from "../../hooks/getOriginal"
import { Form } from "../../component/form";
import { FaSearch } from "react-icons/fa";
import { Button } from "../../component/button";

export const Agenda = () => {
  const [api, setApi] = useState<Map<string, any>>(new Map());
  const [speaker, setSpeaker] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const newData = await getPostData();
        const speakers = newData?.get("speechRecord");
        console.log(speakers);

        if (newData !== null) {
          setApi(newData);
          setSpeaker(speakers);
        } else {
          // newData が null の場合の処理
          console.error("データが null です");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // 関数を即座に呼び出す
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
      {Array.from(api).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong>
          {value !== null && typeof value === "object" ? (
            <div>
              {/* <div>Speech ID: {value.speechID}</div>
              <div>Speech Order: {value.speechOrder}</div>
              <div>Speaker: {value.speaker}</div> */}
              {/* <div>Speech URL: {value.speechURL}</div> */}
            </div>
          ) : (
            // value が null またはオブジェクトでない場合はそのまま表示
            String(value)
          )}
        </div>
      ))}

      {speaker.map((item, index) => (
        <div key={index}>
          <strong>{item.speaker}:</strong> {item.speech}
        </div>
      ))}
    </div>
  );
}
