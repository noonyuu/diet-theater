import { BubbleLeft } from "../../component/speechBubbleLeft";
import { BubbleRight } from "../../component/speechBubbleRight";
import { getPostData } from "../../hooks/getOriginal";
import icon from "../../assets/icon.png";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [detailId, setDetailId] = useState("");
  const [api, setApi] = useState<Map<string, any>>(new Map());

  useEffect(() => {
    if (!location.state || location.state.detailId == null) {
      navigate("/agenda");
      return;
    }
    setDetailId(location.state.detailId);
    // console.log(detailId)
    const fetchData = async () => {
      try {
        const newData = await getPostData();
        const speakers = newData?.get("speechRecord");
        // console.log(newData);

        if (newData !== null) {
          // console.log("eeeee" + detailId);
          // const a = newData.get(location.state.detailId);
          // const b = a["speechRecord"];
          // console.log(a);
          // console.log(newData);

          const apis: Map<string, any> = newData;

          // 新しいMapを作成する
          const newMap = new Map(
            Array.from(apis).filter(
              ([key, value]) => key === location.state.detailId,
            ),
          );

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
  }, [location.state]);
  return (
    <section>
      {
        <div className="mx-2 md:mx-12 lg:mx-24">
          {Array.from(api).map(([keys, values], index) => {
            const pickData = new Map(Object.entries(values));
            const speechRecords = pickData.get("speechRecord");
            // console.log("values");
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
