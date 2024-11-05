/**
 * 意義のナンバー
 * 0:   何もなし
 * 1: 〔「異議あり」と呼ぶ者あり〕
 * 2: 〔「異議なし」と呼ぶ者あり〕
 */

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TablerPencilPlus } from "../../assets/AddPen";

var path = import.meta.env.VITE_APP_PATH;
const TheaterCreate = () => {
  const navigate = useNavigate();

  const { issueID } = useParams();

  const [isFirst, setIsFirst] = useState<boolean>(false);
  const [isGene, setIsGene] = useState<boolean>(false);
  const [isGeneConnect, setIsGeneConnect] = useState<boolean>(false); // 要約中
  const [isShown, setIsShown] = useState<IsShownState>({}); // ポップアップ表示

  const [summary, setSummary] = useState<any[]>([]); // 要約データ

  const [nameOfMeeting, setNameOfMeeting] = useState<string>(); // 会議名
  const [date, setDate] = useState<string>(); // 日付
  const [nameOfHouse, setNameOfHouse] = useState<string>(); // 党派名
  const [oneDates, setOneDates] = useState<any>({}); // 会議データ

  const [speechData, setSpeechData] = useState<any[]>([]);

  const [readOnly, setReadOnly] = useState<ReadOnly>({}); // テキストエリアの編集可否

  const [registerCheck, setRegisterCheck] = useState<boolean[]>([false, false]); // 送信確認

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
      console.log("データがあります");
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
        const dietData = await axios.get(
          `https://kokkai.ndl.go.jp/api/meeting?issueID=${issueID}&recordPacking=json`,
        );
        const dietDataData = new Map<string, any>(
          Object.entries(dietData.data),
        );
        const dietDataMeetingRecord: MeetingRecord =
          dietDataData.get("meetingRecord"); // meetingRecordのデータを取得

        var oneData = new Map<string, any>(
          Object.entries(dietDataMeetingRecord || {}),
        );
        setOneDates(oneData);
        console.log("TheaterCreate", oneData.get("0").speechRecord);
        const fixedSpeechData: any[] = oneData.get("0").speechRecord;
        // fixedSpeechData.shift();
        setSpeechData(fixedSpeechData);
        console.log("fixedSpeechData", fixedSpeechData);
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

  // TODO: speechDataの中身を確認
  useEffect(() => {
    console.log("speechData", speechData);
  }, [speechData]);

  const generate = async () => {
    console.log("generate");
    // const geneData = await axios.get("https://localhost:8443/app/test");
    setIsGeneConnect(true);
    await axios
      .get("https://" + path + "/gpt/" + issueID)
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
      editData[index].speech =
        document.getElementsByTagName("textarea")[index].value;
      setSummary(editData);
      saveStorage(editData);
    }
    // ポップアップを非表示
    setIsShown((prevIsShown) => ({
      ...prevIsShown,
      [index]: !prevIsShown[index],
    }));
  };

  const register = async () => {
    // 会議データの送信データの作成
    const meetingPostData = {
      IssueID: issueID,
      Session: oneDates.get("0").session,
      NameOfHouse: nameOfHouse,
      NameOfMeeting: nameOfMeeting,
      Issue: oneDates.get("0").issue,
      Date: date?.toString(),
    };
    // meetingPostData.set("Date", date.toISOString().split("T")[0]);
    // 発言内容の送信データの作成
    const speechPostData: any = [];
    speechData.forEach((data, index) => {
      let igiContain: string = "0";
      if (speechData[index].speech.includes("〔「異議なし」と呼ぶ者あり〕")) {
        igiContain = "1";
      } else if (speechData[index].speech.includes("〔「異議あり」と呼ぶ者あり〕")) {
        igiContain = "2";
      } else if (speechData[index].speech.includes("拍手")) {
        igiContain = "4";
      } else if (speechData[index].speech.includes("起立")) {
        igiContain = "3";
      } else if (speechData[index].speech.includes("挙手")) {
        igiContain = "5";
      }
      // speechdataがspeechRecordなのでspeechIDとspeakerは正しい挙動をする
      speechPostData.push({
        IssueID: issueID,
        SpeechID: data.speechID,
        Speaker: data.speaker,
        SpeakerYomi: data.speakerYomi,
        SpeakerRole: data.speakerRole,
        SpeakerGroup: data.speakerGroup,
        SpeakerPosition: data.speakerPosition,
        SpeechOrigin: data.speech,
        SpeechSummary: summary[index].speech,
        AnimationPoint: igiContain,
      });
    });
    // データの送信
    await axios
      .post("https://" + path + "/app/meeting_record/insert", meetingPostData)
      .then(
        (response) => {
          console.log("response", response);
        },
        (error) => {
          if (error.response) {
            // サーバーからの応答がある場合
            console.log("Error Data:", error.response.data);
            console.log("Error Status:", error.response.status);
            console.log("Error Headers:", error.response.headers);
          } else if (error.request) {
            // リクエストは送信されたが、応答が受信されなかった場合
            console.log("No response received:", error.request);
          } else {
            // リクエストの設定時に何かが発生した場合
            console.log("Error", error.message);
          }
        },
      )
      .then(() => {
        setRegisterCheck([true, false]);
      });
    // データの送信
    axios
      .post("https://" + path + "/app/speech_record/insert", speechPostData)
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        if (error.response) {
          // サーバーからの応答がある場合
          console.log("Error Data:", error.response.data);
          console.log("Error Status:", error.response.status);
          console.log("Error Headers:", error.response.headers);
        } else if (error.request) {
          // リクエストは送信されたが、応答が受信されなかった場合
          console.log("No response received:", error.request);
        } else {
          // リクエストの設定時に何かが発生した場合
          console.log("Error", error.message);
        }
      })
      .then(() => {
        setRegisterCheck([true, true]);
      });
  };

  useEffect(() => {
    if (registerCheck[0] && registerCheck[1]) {
      // セッション削除
      localStorage.removeItem("summary-data");
      navigate("/secret/theater-create-table");
    }
  }, [registerCheck]);

  if (isGeneConnect) {
    return <div className="mt-16 flex flex-1 justify-center">Loading...</div>;
  }
  return (
    <main className="mt-16 flex-1">
      <div className="mb-4 mt-24">
        {/* 登録ボタン */}
        <div className="flex w-full justify-end">
          <button
            type="submit"
            className="mr-16 w-16 bg-green-300 text-center"
            onClick={() => register()}
          >
            登録
          </button>
        </div>
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
