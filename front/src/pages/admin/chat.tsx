import { BubbleLeft } from "../../component/speechBubbleLeft";
import { BubbleRight } from "../../component/speechBubbleRight";
import { getPostData } from "../../hooks/getOriginal";
import icon from "../../assets/icon.png";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoReturnDownBack } from "react-icons/io5";

///
import DataDefo from "../../test/defo.json";
import Data0 from "../../test/test0.json";
import Data1 from "../../test/test1.json";
import Data2 from "../../test/test2.json";
import Data3 from "../../test/test3.json";
import ListSvg from "../../assets/ListSvg";
import { iconRandomColor } from "../../logic/iconRandomColor";
import { Button } from "../../component/button";
import { testSetData } from "../../test/testSet";
///
interface Test {
  ID: number;
  IssueID: string;
  Session: number;
  NameOfHouse: string;
  NameOfMeeting: string;
  Issue: string;
  Date: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
}
export const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [detailId, setDetailId] = useState("");
  const [api, setApi] = useState<Map<string, any>>(new Map());
  const [activeTab, setActiveTab] = useState(1);

  const returnBack = () => {
    navigate("/agenda");
  };

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/speech_record/select/all",
        );
        const data: Test = await response.json();
        // setItems(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // setItems(null); // Ensure state is updated even on error
      }
    };

    fetchTest();

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
  let concise: SpeechRecord = testSetData(location.state.detailId)[0];
  let child: SpeechRecord = testSetData(location.state.detailId)[1];
  let origin: SpeechRecord = testSetData(location.state.detailId)[2];

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
                        color={iconRandomColor()}
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
                        color={iconRandomColor()}
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
    <section className=" left-0 h-full pt-[5%]">
      <div
        role="tablist"
        className="tabs-boxed tabs fixed right-1 top-0 z-50 flex h-[10%] items-center justify-end space-x-2 bg-white lg:h-[7%]"
      >
        <a
          role="tab"
          className={`tab ${activeTab === 1 ? "tab-active" : ""} text-black`}
          onClick={() => handleTabClick(1)}
          style={{
            backgroundColor: activeTab === 1 ? "RGB(143, 205, 219)" : "",
          }}
        >
          原文
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 2 ? "tab-active" : ""} text-black`}
          onClick={() => handleTabClick(2)}
          style={{
            backgroundColor: activeTab === 2 ? "RGB(143, 205, 219)" : "",
          }}
        >
          要約
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 3 ? "tab-active" : ""} text-black`}
          onClick={() => handleTabClick(3)}
          style={{
            backgroundColor: activeTab === 3 ? "RGB(143, 205, 219)" : "",
          }}
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
      <Button
        name={<IoReturnDownBack />}
        color="bg-white text-black"
        action={returnBack}
        decoration="rounded-lg border border-black fixed z-[49] top-[12%] lg:top-[9%]"
      />
      <div className="mt-10">
        {activeTab === 1 && <TabContent1 />}
        {activeTab === 2 && <TabContent2 />}
        {activeTab === 3 && <TabContent3 />}
      </div>
    </section>
  );
};
