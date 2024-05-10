import React, { useCallback, useEffect, useState } from "react";
import "./theater.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Opning } from "./animation/opning/Opning";

// TODO:リロード時に続きから表示するかの選択
var path = import.meta.env.VITE_APP_PATH;
export const Theater = () => {
  const location = useLocation();

  const [speechRecords, setSpeechRecords] = useState<any[]>([]); //  スピーチレコード
  const [currSpeechRecord, setCurrSpeechRecord] = useState<number>(0); //  現在のスピーチレコード

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(false); //  初回ロード

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
          "https://" +
            path +
            "/app/speech_record/select/once/" +
            location.state.detailId,
          // "https://yeeeee-waaaaaa.noonyuu.com/app/speech_record/select/all",
        );

        if (Array.isArray(response.data)) {
          setSpeechRecords(response.data);
          setIsFirstLoad(true);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // キーボード操作
  const handleKeyUp = useCallback(
    (e: { keyCode: any }) => {
      const keyCode = e.keyCode;

      if (keyCode === 37) {
        back();
      }
      if (keyCode === 39) {
        next();
      }
    },
    [isFirstLoad],
  );

  useEffect(() => {
    if (isFirstLoad) {
      addEventListener("keyup", (e) => handleKeyUp(e));
    }
  }, [isFirstLoad]);

  // 次のスピーチレコード
  const next = () => {
    setCurrSpeechRecord((curr) => {
      curr === speechRecords.length - 1 && finish();
      return curr === speechRecords.length - 1 ? curr : curr + 1;
    });
  };

  // 前のスピーチレコード
  const back = () => {
    setCurrSpeechRecord((curr) => {
      return curr === 0 ? curr : curr - 1;
    });
  };

  const finish = () => {
    console.log("finish");
    <div className="absolute left-52 top-20 bg-white">か</div>;
  };

  return (
    <main className="theater-back relative h-full">
      <Opning />
      {/* <Anime /> */}
      <button
        type="button"
        className="absolute left-[20%] top-[30%] text-3xl text-white"
        onClick={() => back()}
      >
        &lt;
      </button>
      <div className="balloon1 absolute left-[50%] top-24 -translate-x-1/2 rounded-md p-24 text-2xl">
        {speechRecords.length > 0 && speechRecords[currSpeechRecord] && (
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
