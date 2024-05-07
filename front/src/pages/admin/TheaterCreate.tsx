import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { TablerPencilPlus } from "../../assets/AddPen";

import styles from "./PopUp.css";

const TheaterCreate = () => {
  const { issueID } = useParams();

  const [isFirst, setIsFirst] = useState<boolean>(false);
  const [isGene, setIsGene] = useState<boolean>(false);
  const [isGeneConnect, setIsGeneConnect] = useState<boolean>(false); // 要約中
  const [isShown, setIsShown] = useState<IsShownState>({}); // ポップアップ表示

  const [summary, setSummary] = useState<any[]>([]); // 要約データ

  const [nameOfMeeting, setNameOfMeeting] = useState<string>(); // 会議名
  const [date, setDate] = useState<string>(); // 日付
  const [nameOfHouse, setNameOfHouse] = useState<string>(); // 党派名

  const [speechData, setSpeechData] = useState<any[]>([]);

  const [readOnly, setReadOnly] = useState<ReadOnly>({}); // テキストエリアの編集可否

  interface MeetingRecord {
    [key: string]: any;
  }

  type IsShownState = {
    [key: number]: boolean;
  };

  type ReadOnly = {
    [key: number]: boolean;
  };

  useEffect(() => {
    const loadedData = loadData();
    if (loadedData !== null) {
      setSummary(loadedData!);
      if (summary.length > 0) {
        // summaryが空でない場合にのみisGeneをtrueに設定
        setIsGene(true);
      }
    } else {
      console.log("データがありません");
    }

    const fetchData = async () => {
      try {
        const kobe = await axios.get(
          `https://kokkai.ndl.go.jp/api/meeting?issueID=${issueID}&recordPacking=json`,
        );
        const kobeData = new Map<string, any>(Object.entries(kobe.data));
        const kobeMeetingRecord: MeetingRecord = kobeData.get("meetingRecord");

        var oneData = new Map<string, any>(
          Object.entries(kobeMeetingRecord || {}),
        );
        console.log("TheaterCreate", oneData.get("0").speechRecord);
        const fixedSpeechData: any[] = oneData.get("0").speechRecord;
        // fixedSpeechData.shift();
        setSpeechData(fixedSpeechData);
        setNameOfMeeting(oneData.get("0").nameOfMeeting);
        setDate(oneData.get("0").date);
        setNameOfHouse(oneData.get("0").nameOfHouse);
        return oneData;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    fetchData();
  }, [issueID]);

  const generate = async () => {
    console.log("generate");
    // const geneData = await axios.get("https://localhost:8443/app/test");
    setIsGeneConnect(true);
    await axios
      .get("https://localhost:8443/gpt/" + issueID)
      .then((response) => {
        console.log("response", response.data.message);
        setSummary(response.data.message);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setIsGeneConnect(false); // ローディング終了
      });
  };

  useEffect(() => {
    if (!isFirst) {
      setIsFirst(true);
      return;
    }
    if (summary.length > 0) {
      // summaryが空でない場合にのみisGeneをtrueに設定
      setIsGene(true);
      saveStorage(summary);
    }
  }, [summary]);

  const saveStorage = (_date: any) => {
    localStorage.setItem("summary-data", JSON.stringify(_date));
  };

  const loadData = () => {
    const loadedData = localStorage.getItem("summary-data");
    console.log("loadedData", loadedData);
    if (loadedData) {
      setSummary(JSON.parse(loadedData));
    }
    return null;
  };

  // ポップアップ表示
  const handleToggleButtonClick = (index: number) => {
    setIsShown((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // 編集ボタンを押した際の処理
  const edit = (index: number, speech: string) => {
    // テキストエリアの編集可否を変更
    setReadOnly((prevReadOnly) => ({
      ...prevReadOnly,
      [index]: !prevReadOnly[index],
    }));
    // 編集内容を保存
    if (readOnly[index]) {
      // 編集完了
      const editData = summary;
      editData[index].speech = document.getElementsByTagName("textarea")[index].value;
      setSummary(editData);
      saveStorage(editData);
    }
      // ポップアップを非表示
      setIsShown((prevIsShown) => ({
        ...prevIsShown,
        [index]: !prevIsShown[index],
      }));
  };

  if (isGeneConnect) {
    return <div className="mt-16 flex flex-1 justify-center">Loading...</div>;
  }
  return (
    <main className="mt-16 flex-1">
      <div className="mb-4 mt-24">
        {/* API取得データ */}
        <div className="flex justify-center">
          <div className="flex w-full justify-center">{nameOfHouse}</div>
          <div className="flex w-full justify-center">{nameOfMeeting}</div>
          <div className="flex w-full justify-center">{date}</div>
        </div>
        {/* 原文・要約比較 */}
        <div className="mx-auto mt-8 flex w-3/4">
          {/* 原文 */}
          <div className="w-1/2 border">
            <p className="border-b text-center">原文</p>
            <div className="">
              {speechData.map((speech: any, index: number) => (
                <div
                  key={index}
                  className="scroll-custom mx-auto my-4 h-48 w-5/6 overflow-y-auto border p-2"
                >
                  {speech.speech}
                </div>
              ))}
            </div>
          </div>
          {/* 要約 */}
          <div className="w-1/2 border">
            <p className="border-b text-center">要約</p>
            {isGene ? (
              <div className="">
                {summary.map((speech: any, index: number) => (
                  <div
                    key={index}
                    className="scroll-custom relative mx-auto my-4 h-48 w-5/6"
                  >
                    <textarea
                      className={`scroll-custom mx-auto h-48 w-full resize-none overflow-y-auto border bg-white p-2 ${readOnly[index] ? "border-2 border-green-300" : ""}`}
                      readOnly={readOnly[index] ? false : true}
                    >
                      {speech.speech}
                    </textarea>
                    <button
                      className="absolute bottom-2 right-2 rounded-full"
                      onClick={() => handleToggleButtonClick(index)}
                    >
                      <TablerPencilPlus />
                    </button>

                    {isShown[index] && (
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md border bg-gray-200 px-8 py-4">
                        {/* ポップアップの中身 */}
                        <p>{readOnly ? "編集しますか？" : "終了しますか？"}</p>
                        <div className="mt-2 flex justify-between">
                          <button
                            type="button"
                            onClick={() => edit(index, speech.speech)}
                          >
                            はい
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setIsShown((prev) => ({
                                ...prev,
                                [index]: false,
                              }))
                            }
                          >
                            いいえ
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center">
                <button
                  type="button"
                  className="mt-16 rounded-md bg-green-300 p-2"
                  onClick={() => generate()}
                >
                  GENERATE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default TheaterCreate;
