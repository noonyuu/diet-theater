import axios from "axios";
import React, { useEffect, useState } from "react";

var path = import.meta.env.VITE_APP_PATH;
const ShowSpeech = () => {
  const [speechRecords, setSpeechRecords] = useState<any[]>([]); //  スピーチレコード
  const [currSpeechRecord, setCurrSpeechRecord] = useState<number>(0); //  現在のスピーチレコード

  useEffect(() => {
    // APIを叩きに行く処理
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://" + path + "/app/speech_record/select/all",
        );

        if (Array.isArray(response.data)) {
          setSpeechRecords(response.data);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // 次のスピーチレコード
  const next = () => {
    if(currSpeechRecord === speechRecords.length - 1) {
      return;
    }
    setCurrSpeechRecord(currSpeechRecord + 1);
  };
  // 前のスピーチレコード
  const back = () => {
    if (currSpeechRecord === 0) {
      return;
    }
    setCurrSpeechRecord(currSpeechRecord - 1);
  };

  return (
    <div>
      <div className="flex">
        <button onClick={() => back()}>&lt;</button>
        {speechRecords.length > 0 && (
          <div className="w-full text-center">
            {speechRecords[currSpeechRecord].SpeechSummary.replaceAll(
              "「",
              "",
            ).replaceAll("」", "")}
          </div>
        )}
        <button onClick={() => next()}>&gt;</button>
      </div>

      {/* <div>
        {speechRecords.map((record, index) => (
          <div key={index}>{record.SpeechSummary}</div>
        ))}
      </div> */}

      <div className="h-48 w-36 border">
        {speechRecords.length > 0 && (
          <div className="h-48 w-36 border">
            <p>名前：{speechRecords[currSpeechRecord].Speaker}</p>
            <p>
              所属：
              {speechRecords[currSpeechRecord].SpeakerGroup
                ? speechRecords[currSpeechRecord].SpeakerGroup
                : "所属なし"}
            </p>
            <p>
              役職：
              {speechRecords[currSpeechRecord].speakerRole
                ? speechRecords[currSpeechRecord].speakerRole
                : "役職なし"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowSpeech;
