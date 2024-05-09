import React, { useEffect, useState } from "react";
import "./theater.css";
import ShowSpeech from "./ShowSpeech";
import { Anime } from "./Anime";
import axios from "axios";
// TODO:リロード時に続きから表示するかの選択
var path = import.meta.env.VITE_APP_PATH;
export const Theater = () => {
  const [speechRecords, setSpeechRecords] = useState<any[]>([]); //  スピーチレコード
  const [currSpeechRecord, setCurrSpeechRecord] = useState<number>(0); //  現在のスピーチレコード

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

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
    if (currSpeechRecord === speechRecords.length - 1) {
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
    <main className="theater-back relative h-full">
      {/* <Anime /> */}
      <button
        type="button"
        className="absolute left-[20%] top-[30%] text-3xl text-white"
        onClick={() => back()}
      >
        &lt;
      </button>
      <div className="balloon1 absolute left-[50%] top-24 -translate-x-1/2 rounded-md p-24">
        {speechRecords.length > 0 && (
          <div className="w-full text-center">
            {speechRecords[currSpeechRecord].SpeechSummary.replaceAll(
              "「",
              "",
            ).replaceAll("」", "")}
          </div>
        )}
      </div>
      <button
        type="button"
        className="absolute right-[20%] top-[30%] text-3xl text-white"
        onClick={() => next()}
      >
        &gt;
      </button>
    </main>
  );
};
