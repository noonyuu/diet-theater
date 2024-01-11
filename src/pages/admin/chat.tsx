import { useEffect, useState } from "react";
import { BubbleLeft } from "../../component/speechBubbleLeft";
import { BubbleRight } from "../../component/speechBubbleRight";
import { getPostData } from "../../hooks/getOriginal";
import icon from "../../assets/icon.png";
import React from "react";

export const Chat = () => {
  const [api, setApi] = useState<Map<string, any>>(new Map());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getPostData();
        const speakers = newData?.get("speechRecord");
        // console.log(newData);

        if (newData !== null) {
          const a = newData.get("0");
          const b = a["speechRecord"];
          // console.log(a);
          // console.log(newData);

          // 初期のapiがどのような構造を持っているかわからないため、型もanyとしています。
          const apis: Map<string, any> = newData;

          // 新しいMapを作成する
          const newMap = new Map(
            Array.from(apis).filter(([key, value]) => key === "0"),
          );

          console.log(newMap);

          setApi(newMap);
          // setSpeaker(speakers);
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
    <section className="bg-bac-main">
      {
        <div className="mx-2 md:mx-12 lg:mx-24">
          {Array.from(api).map(([keys, values], index) => {
            const pickData = new Map(Object.entries(values));
            const speechRecords = pickData.get("speechRecord");
            console.log("values");
            return (
              <span
                key={keys}
                className="whitespace-pre"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {Array.isArray(speechRecords) &&
                  speechRecords.length > 0 &&
                  speechRecords.slice(1).map((speechRecord, recordIndex) => {
                    const speech = speechRecord["speech"];
                    // \r\nを改行に変換
                    const formattedSpeech = speech
                      ? speech.replace(/\r\n/g, "\n")
                      : null;
                    // 偶数奇数で BubbleRight と BubbleLeft を交互に表示
                    const isEven = (index + recordIndex) % 2 === 0;
                    const bubbleComponent = isEven ? (
                      <div className="flex items-end justify-start">
                        <div className="">
                          <img src={icon} alt="logo" className="mx-auto" />
                          <p>{speechRecord["speaker"]}</p>
                        </div>
                        <BubbleRight content={formattedSpeech} />
                      </div>
                    ) : (
                      <div className="flex items-end justify-end">
                        <BubbleLeft content={formattedSpeech} />
                        <div className="text-center">
                          <img src={icon} alt="logo" className="mx-auto" />
                          <p>{speechRecord["speaker"]}</p>
                        </div>
                      </div>
                    );
                    return (
                      <React.Fragment key={recordIndex}>
                        {bubbleComponent}
                      </React.Fragment>
                    );
                  })}
              </span>
            );
          })}
        </div>
      }
    </section>
  );
};
