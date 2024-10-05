import React, { useCallback, useEffect, useState } from "react";
import "./theater.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Opning } from "./animation/opning/Opning";
import { Animation } from "../user/animation/Animation";
import { Ending } from "./animation/ending/Ending";
// import

// TODO:リロード時に続きから表示するかの選択
var path = import.meta.env.VITE_APP_PATH;
export const Theater = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [speechRecords, setSpeechRecords] = useState<any[]>([]); //  スピーチレコード
  const [currSpeechRecord, setCurrSpeechRecord] = useState<number>(0); //  現在のスピーチレコード

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(false); //  初回ロード
  const [isFinish, setIsFinish] = useState<boolean>(false); //  終了

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
            "/app/speech-record/select/once/" +
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
    setIsFinish(true);
  };

  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // アニメーション表示条件をリセット
    setShowAnimation(false);
    if (
      speechRecords[currSpeechRecord] &&
      speechRecords[currSpeechRecord].AnimationPoint !== "0"
    ) {
      // 1秒後にアニメーション表示状態をtrueに設定
      const timer = setTimeout(() => {
        setShowAnimation(true);
      }, 1000);
      // コンポーネントのアンマウント時にタイマーをクリア
      return () => clearTimeout(timer);
    }
  }, [currSpeechRecord, speechRecords]);

  useEffect(() => {
    if (isFinish) {
      // エンディングアニメーションの終了を待つ
      const timer = setTimeout(() => {
        <div id="wrap"></div>;
        // アニメーションが終了したらagenda画面に遷移する
        navigate("/agenda");
      }, 1000); // 3000ミリ秒後に実行

      return () => clearTimeout(timer); // コンポーネントのクリーンアップ時にタイマーをクリア
    }
  }, [isFinish, navigate]);

  // if (isFinish) {
  //   return (
  //     <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-3xl text-white">
  //       <Ending />
  //     </div>
  //   );
  // }

  return (
    <main className="theater-back relative min-h-svh">
      <Opning />
      {/* <Anime /> */}
      <button
        type="button"
        className="absolute left-[20%] top-[30%] text-3xl text-white"
        onClick={() => back()}
      >
        &lt;
      </button>
      {/* <div className="balloon1 absolute left-[50%] top-24 -translate-x-1/2 rounded-md p-24 text-2xl">
        {speechRecords.length > 0 && speechRecords[currSpeechRecord] && (
          <div className="w-full text-center">
            {speechRecords[currSpeechRecord].SpeechSummary.replaceAll(
              "「",
              "",
            ).replaceAll("」", "")}
          </div>
        )}
      </div> */}
      <div className="balloon1 absolute left-[50%] top-0 w-fit -translate-x-1/2 rounded-md p-24 text-2xl">
        {speechRecords.length > 0 && speechRecords[currSpeechRecord] && (
          <div className="w-full text-center text-xs text-white md:text-lg">
            {speechRecords[currSpeechRecord].SpeechSummary.replaceAll("「", "")
              .replaceAll("」", "")
              .split("。")
              .map(
                (
                  sentence:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined,
                  index: React.Key | null | undefined,
                  array: string | any[],
                ) => (
                  <React.Fragment key={index}>
                    {sentence}
                    {index !== array.length - 1 && "。"}{" "}
                    {/* 最後の文以外は句点で結合 */}
                    {index !== array.length - 1 && <br />}{" "}
                    {/* 最後の文以外は改行 */}
                  </React.Fragment>
                ),
              )}
          </div>
        )}
      </div>{" "}
      <button
        type="button"
        className="absolute right-[20%] top-[30%] text-3xl text-white"
        onClick={() => next()}
      >
        &gt;
      </button>
      <div className="absolute left-[5%] top-[50%] size-fit border border-black bg-black p-4 text-3xl md:p-8 lg:border-white">
        {speechRecords.length > 0 && (
          <div className="">
            <p className="text-xs text-white lg:text-3xl">
              名前：{speechRecords[currSpeechRecord].Speaker}
            </p>
            <p className="text-xs text-white lg:text-3xl">
              所属：
              {speechRecords[currSpeechRecord].SpeakerGroup
                ? speechRecords[currSpeechRecord].SpeakerGroup
                : "所属なし"}
            </p>
            <p className="text-xs text-white md:text-3xl">
              役職：
              {speechRecords[currSpeechRecord].speakerRole
                ? speechRecords[currSpeechRecord].speakerRole
                : "役職なし"}
            </p>
          </div>
        )}
      </div>
      {showAnimation &&
        speechRecords[currSpeechRecord].AnimationPoint !== "0" && (
          <Animation arg={speechRecords[currSpeechRecord].AnimationPoint} />
        )}
    </main>
  );
};
