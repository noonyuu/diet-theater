import { BubbleLeft } from "../../../component/speechBubbleLeft";
import { BubbleRight } from "../../../component/speechBubbleRight";
import { getPostData } from "../../../hooks/getOriginal";
import icon from "../../assets/icon.png";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ListSvg from "../../../assets/ListSvg";
import { iconRandomColor } from "../../../logic/iconRandomColor";
import { Button } from "../../../component/button";
import { testSetData } from "../../../test/testSet";
// アイコン
import { IcSharpKeyboardReturn } from "../../../assets/Return";
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
    // true -> 同じ発言者, false -> 違う発言者, null -> 初期値
    var originViewLocation: boolean | null = true;

    var cont: number = 0;

    return (
      <div>
        {Object.entries(origin).map(([key, value], index, array) => {
          const formattedSpeech = value.speech
            ? value.speech.replace(/\r\n/g, "\n")
            : null;

          // 発言者の連続判定
          originViewLocation =
            index > 0
              ? value.speaker == array[index - 1][1].speaker
                ? (originViewLocation = true)
                : (originViewLocation = false)
              : false;

          originViewLocation ? (cont += 2) : (cont += 1);

          return (
            <span
              key={key}
              className="whitespace-pre"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {cont % 2 === 1 ? (
                <div className="flex items-end justify-start">
                  <div className="w-24 text-center">
                    <ListSvg
                      fill="#FF0000"
                      style={{ margin: "auto" }}
                      color={iconRandomColor()}
                    />
                    <p className="w-24 pt-1 text-sm">{value.speaker}</p>
                  </div>
                  <BubbleLeft content={formattedSpeech} />
                </div>
              ) : (
                <div className="flex items-end justify-end">
                  <BubbleRight content={formattedSpeech} />
                  <div className="w-24 text-center">
                    <ListSvg
                      fill="#FF0000"
                      style={{ margin: "auto" }}
                      color={iconRandomColor()}
                    />
                    <p className="w-24 pt-1 text-sm">{value.speaker}</p>
                  </div>
                </div>
              )}
            </span>
          );
        })}
      </div>
    );
  };
  // const TabContent2 = () => {
  //   // true -> 同じ発言者, false -> 違う発言者, null -> 初期値
  //   var originViewLocation: boolean | null = true;

  //   var cont: number = 0;

  //   return (
  //     <div>
  //       {Object.entries(concise).map(([key, value], index, array) => {
  //         const formattedSpeech = value.speech
  //           ? value.speech.replace(/\r\n/g, "\n")
  //           : null;

  //         // 発言者の連続判定
  //         originViewLocation =
  //           index > 0
  //             ? value.speaker == array[index - 1][1].speaker
  //               ? (originViewLocation = true)
  //               : (originViewLocation = false)
  //             : false;

  //         originViewLocation ? (cont += 2) : (cont += 1);

  //         return (
  //           <span
  //             key={key}
  //             className="whitespace-pre"
  //             style={{ whiteSpace: "pre-wrap" }}
  //           >
  //             {cont % 2 === 1 ? (
  //               <div className="flex items-end justify-start">
  //                 <div className="w-24 text-center">
  //                   <ListSvg
  //                     fill="#FF0000"
  //                     style={{ margin: "auto" }}
  //                     color={iconRandomColor()}
  //                   />
  //                   <p className="pt-1 text-sm md:text-lg">{value.speaker}</p>
  //                 </div>
  //                 <BubbleLeft content={formattedSpeech} />
  //               </div>
  //             ) : (
  //               <div className="flex items-end justify-end">
  //                 <BubbleRight content={formattedSpeech} />
  //                 <div className="w-24 text-center">
  //                   <ListSvg
  //                     fill="#FF0000"
  //                     style={{ margin: "auto" }}
  //                     color={iconRandomColor()}
  //                   />
  //                   <p className="pt-1 text-sm md:text-lg">{value.speaker}</p>
  //                 </div>
  //               </div>
  //             )}
  //           </span>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  const TabContent3 = () => {
    // true -> 同じ発言者, false -> 違う発言者, null -> 初期値
    var originViewLocation: boolean | null = true;

    var cont: number = 0;
    return (
      <div className="mt-16">
        {Object.entries(child).map(([key, value], index, array) => {
          const formattedSpeech = value.speech
            ? value.speech.replace(/\r\n/g, "\n")
            : null;

          // 発言者の連続判定
          originViewLocation =
            index > 0
              ? value.speaker == array[index - 1][1].speaker
                ? (originViewLocation = true)
                : (originViewLocation = false)
              : false;

          originViewLocation ? (cont += 2) : (cont += 1);

          return (
            <span
              key={key}
              className="whitespace-pre"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {cont % 2 === 1 ? (
                <div className="flex items-end justify-start">
                  <div className="w-24 text-center">
                    <ListSvg
                      fill="#FF0000"
                      style={{ margin: "auto" }}
                      color={iconRandomColor()}
                    />
                    <p className="w-24 pt-1 text-sm">{value.speaker}</p>
                  </div>
                  <BubbleLeft content={formattedSpeech} />
                </div>
              ) : (
                <div className="flex items-end justify-end">
                  <BubbleRight content={formattedSpeech} />
                  <div className="w-24 text-center">
                    <ListSvg
                      fill="#FF0000"
                      style={{ margin: "auto" }}
                      color={iconRandomColor()}
                    />
                    <p className="w-24 pt-1 text-xs">{value.speaker}</p>
                  </div>
                </div>
              )}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <main className="mt-16 flex-1 bg-bac-main">
      <section className="left-0">
        <div
          role="tablist"
          className="tabs-boxed tabs fixed right-16 top-0 z-50 flex h-16 items-center justify-end space-x-2 bg-white"
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
          {/* <a
            role="tab"
            className={`tab ${activeTab === 2 ? "tab-active" : ""} text-black`}
            onClick={() => handleTabClick(2)}
            style={{
              backgroundColor: activeTab === 2 ? "RGB(143, 205, 219)" : "",
            }}
          >
            要約
          </a> */}
          <a
            role="tab"
            className={`tab ${activeTab === 3 ? "tab-active" : ""} text-black`}
            onClick={() => handleTabClick(3)}
            style={{
              backgroundColor: activeTab === 3 ? "RGB(143, 205, 219)" : "",
            }}
          >
            要約
          </a>
        </div>
        <Button
          name={<IcSharpKeyboardReturn />}
          color="bg-white text-black"
          action={returnBack}
          decoration="rounded-lg border border-black fixed z-[49] top-[12%] lg:top-[9%] h-8"
        />
        <div className="bg-white">
          {activeTab === 1 && <TabContent1 />}
          {/* {activeTab === 2 && <TabContent2 />} */}
          {activeTab === 3 && <TabContent3 />}
        </div>
      </section>
    </main>
  );
};
