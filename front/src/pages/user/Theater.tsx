import React, { useEffect, useRef, useState } from "react";
import "./theater.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Opening } from "./animation/opening/Opening";
import { Animation } from "./animation/Animation";
import { useFetchSpeech } from "../../hooks/useFetchSpeech";
import { useKey } from "../../hooks/useKey";
import { Speech } from "../../types/speech";

import gif from "../user/animation/anime_img/dareda.gif";
import { AutoVoiceComponent } from "./AudioPlayer";

// TODO:リロード時に続きから表示するかの選択
var path = import.meta.env.VITE_APP_SPEECH_PATH;

export const Theater = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const url = path + "select/once/" + location.state.IssueId;

  const [isOpening, setIsOpening] = useState<boolean>(false); // オープニングアニメーションの終了監視フラグ

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(false); //  初回ロード
  const [showAnimation, setShowAnimation] = useState(false);
  const { speech, error, isLoading } = useFetchSpeech(url);

  let newSpeechData;

  if (!speech === null) {
    newSpeechData = { speech };
  }

  useEffect(() => {
    if (!isLoading) {
      setIsFirstLoad(true);
    }
  }, [speech]);

  const { next, back, currSpeechRecord, isFinish } = useKey(
    speech,
    isFirstLoad,
  );

  // スクロールを禁止
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  useEffect(() => {
    // アニメーション表示条件をリセット
    setShowAnimation(false);
    if (speech) {
      if (
        speech[currSpeechRecord] &&
        speech[currSpeechRecord].AnimationPoint !== "0"
      ) {
        // 1秒後にアニメーション表示状態をtrueに設定
        const timer = setTimeout(() => {
          setShowAnimation(true);
        }, 1000);
        // コンポーネントのアンマウント時にタイマーをクリア
        return () => clearTimeout(timer);
      }
    }
  }, [currSpeechRecord, speech]);

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
  const [isEndOpening, setIsEndOpening] = useState<boolean>(false);
  // オープニングアニメーションの終了を監視
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEndOpening(true);
    }, 2000);
    return () => clearTimeout(timer); // クリーンアップタイマー
  }, []);
  // オープニングアニメーションの終了後にセリフ表示
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpening(true);
    }, 5500);
    return () => clearTimeout(timer); // クリーンアップタイマー
  }, [isEndOpening]);

  return (
    <main className="theater-back relative min-h-svh">
      <Opening />
      {/* isOpeningがfalseの場合に実行 */}
      {!isOpening ? (
        isEndOpening ? (
          <img src={gif} className="size-full" />
        ) : null
      ) : (
        <div>
          <button
            type="button"
            className="absolute left-[20%] top-[30%] text-3xl text-white"
            onClick={() => back()}
          >
            &lt;
          </button>
          <div className="balloon1 absolute left-[50%] top-0 w-fit -translate-x-1/2 rounded-md p-24 text-2xl">
            {speech && speech!.length > 0 && speech![currSpeechRecord] && (
              <div className="w-full text-center text-xs text-white md:text-lg">
                <AutoVoiceComponent
                  text={speech[currSpeechRecord].SpeechSummary}
                  speech={speech}
                  currSpeechRecord={currSpeechRecord}
                  next={next}
                />
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
          <div className="absolute left-[5%] top-[50%] size-fit border border-black bg-black p-4 text-3xl md:p-8 lg:border-white">
            {speech && speech!.length > 0 && (
              <div className="">
                <p className="text-xs text-white lg:text-3xl">
                  名前：{speech![currSpeechRecord].Speaker}
                </p>
                <p className="text-xs text-white lg:text-3xl">
                  所属：
                  {speech![currSpeechRecord].SpeakerGroup
                    ? speech![currSpeechRecord].SpeakerGroup
                    : "所属なし"}
                </p>
                <p className="text-xs text-white md:text-3xl">
                  役職：
                  {speech![currSpeechRecord].SpeakerRole
                    ? speech![currSpeechRecord].SpeakerRole
                    : "役職なし"}
                </p>
              </div>
            )}
          </div>
          {showAnimation &&
            speech![currSpeechRecord].AnimationPoint !== "0" && (
              <Animation
                arg={Number(speech![currSpeechRecord].AnimationPoint)}
              />
            )}
        </div>
      )}
    </main>
  );
};
