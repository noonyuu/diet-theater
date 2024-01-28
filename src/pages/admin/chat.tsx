import { BubbleLeft } from "../../component/speechBubbleLeft";
import { BubbleRight } from "../../component/speechBubbleRight";
import { getPostData } from "../../hooks/getOriginal";
import icon from "../../assets/icon.png";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../component/button";
import { FaSearch } from "react-icons/fa";

///
import Data from "../../test/test.json";
import ListSvg from "../../assets/ListSvg";
///

export const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [detailId, setDetailId] = useState("");
  const [api, setApi] = useState<Map<string, any>>(new Map());
  const [activeTab, setActiveTab] = useState(1);

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

  //  タブ切り替えよう
  const handleTabClick = (tabNumber: React.SetStateAction<number>) => {
    setActiveTab(tabNumber);
  };

  interface SpeechRecord {
    [key: string]: {
      speaker: string;
      speech: string;
    };
  }

  const concise: SpeechRecord = Data.all.concise_speechRecords;
  const child: SpeechRecord = Data.all.childe_speechRecords;
  const origin: SpeechRecord = Data.all.original_speechRecords;

  const TabContent1 = () => {
    return (
      <div>
        <span className="whitespace-pre" style={{ whiteSpace: "pre-wrap" }}>
          {Array.from({ length: 6 }, (_, i) => {
            const formattedSpeech = origin[i]?.speech
              ? origin[i].speech.replace(/\r\n/g, "\n")
              : null;

            return (
              <React.Fragment key={i}>
                {i % 2 === 0 ? (
                  <div className="flex items-end justify-start">
                    <div className="w-24 text-center">
                      <ListSvg
                        fill="#FF0000"
                        style={{ margin: "auto" }}
                        color={"blue"}
                      />
                      <p className="pt-1 text-sm md:text-lg">
                        {origin[i]?.speaker}
                      </p>
                    </div>
                    <BubbleRight content={formattedSpeech} />
                  </div>
                ) : (
                  <div className="flex items-end justify-end">
                    <BubbleLeft content={formattedSpeech} />
                    <div className="w-24 text-center">
                      <ListSvg
                        fill="#FF0000"
                        style={{ margin: "auto" }}
                        color={"blue"}
                      />
                      <p className="pt-1 text-sm md:text-lg">
                        {origin[i]?.speaker}
                      </p>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </span>
      </div>
    );
  };

  const TabContent2 = () => {
    return (
      <div>
        <span className="whitespace-pre" style={{ whiteSpace: "pre-wrap" }}>
          {Array.from({ length: 6 }, (_, i) => {
            const formattedSpeech = concise[i]?.speech
              ? concise[i].speech.replace(/\r\n/g, "\n")
              : null;

            return (
              <React.Fragment key={i}>
                {i % 2 === 0 ? (
                  <div className="flex items-end justify-start">
                    <div className="w-24 text-center">
                      <ListSvg
                        fill="#FF0000"
                        style={{ margin: "auto" }}
                        color={"blue"}
                      />
                      <p className="pt-1 text-sm md:text-lg">
                        {origin[i]?.speaker}
                      </p>
                    </div>
                    <BubbleRight content={formattedSpeech} />
                  </div>
                ) : (
                  <div className="flex items-end justify-end">
                    <BubbleLeft content={formattedSpeech} />
                    <div className="w-24 text-center">
                      <ListSvg
                        fill="#FF0000"
                        style={{ margin: "auto" }}
                        color={"blue"}
                      />
                      <p className="pt-1 text-sm md:text-lg">
                        {origin[i]?.speaker}
                      </p>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </span>
      </div>
    );
  };

  const TabContent3 = () => {
    return (
      <div>
        <span className="whitespace-pre" style={{ whiteSpace: "pre-wrap" }}>
          {Array.from({ length: 6 }, (_, i) => {
            const formattedSpeech = child[i]?.speech
              ? child[i].speech.replace(/\r\n/g, "\n")
              : null;

            return (
              <React.Fragment key={i}>
                {i % 2 === 0 ? (
                  <div className="flex items-end justify-start">
                    <div className="w-24 text-center">
                      <ListSvg
                        fill="#FF0000"
                        style={{ margin: "auto" }}
                        color={"blue"}
                      />
                      <p className="pt-1 text-sm md:text-lg">
                        {origin[i]?.speaker}
                      </p>
                    </div>
                    <BubbleRight content={formattedSpeech} />
                  </div>
                ) : (
                  <div className="flex items-end justify-end">
                    <BubbleLeft content={formattedSpeech} />
                    <div className="w-24 text-center">
                      <ListSvg
                        fill="#FF0000"
                        style={{ margin: "auto" }}
                        color={"blue"}
                      />
                      <p className="pt-1 text-sm md:text-lg">
                        {origin[i]?.speaker}
                      </p>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </span>
      </div>
    );
  };

  return (
    <section className=" left-0 h-full pt-2">
      <div
        role="tablist"
        className="tabs-boxed tabs fixed right-1 top-0 z-50 flex h-[5%] items-center justify-end space-x-2 bg-white"
      >
        <a
          role="tab"
          className={`tab ${activeTab === 1 ? "tab-active" : ""} text-black`}
          onClick={() => handleTabClick(1)}
          style={{ backgroundColor: activeTab === 1 ? "RGB(162,176,199)" : "" }}
        >
          原文
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 2 ? "tab-active" : ""} text-black`}
          onClick={() => handleTabClick(2)}
          style={{ backgroundColor: activeTab === 2 ? "RGB(162,176,199)" : "" }}
        >
          要約
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 3 ? "tab-active" : ""} text-black`}
          onClick={() => handleTabClick(3)}
          style={{ backgroundColor: activeTab === 3 ? "RGB(162,176,199)" : "" }}
        >
          簡易
        </a>
      </div>
      {/* <div className="fixed right-0 top-20 flex h-[5%] items-center justify-end space-x-2">
        <Button
          name="原文"
          color="bg-white text-black"
          action=""
          decoration="rounded-lg border border-black h-[50%]"
        />
        <Button
          name="要約"
          color="bg-white text-black"
          action=""
          decoration="rounded-lg border border-black h-[50%]"
        />
        <Button
          name="簡易"
          color="bg-white text-black"
          action=""
          decoration="rounded-lg border border-black h-[50%]"
        />
      </div> */}
      {activeTab === 1 && <TabContent1 />}
      {activeTab === 2 && <TabContent2 />}
      {activeTab === 3 && <TabContent3 />}
    </section>
  );
};
