import React, { useEffect, useState } from "react";
import "./animation.css";
import objection from "../animation/anime_img/objection.png";
import no_objection from "../animation/anime_img/no_objection.gif";
import standup from "../animation/anime_img/standup.png";
import clap from "../animation/anime_img/clap.gif";
import hand_up from "../animation/anime_img/hand_up.gif";

import cat from "../animation/anime_img/cut-in.mp3";

let catIn: HTMLAudioElement | null = null;

export const Animation = ({ arg }: { arg: number }) => {
  const [isVisible, setIsVisible] = useState(true);

  const img = ["", no_objection, objection, standup, clap, hand_up];

  const bgmPlayer = async () => {
    try {
      if (catIn) {
        // 既存の音声が再生中であれば一度停止
        catIn.pause();
        catIn = null;
      }

      catIn = new Audio(cat);

      catIn.volume = 1;

      catIn.addEventListener("ended", () => {
        catIn = null;
        // サイド再生する
        catIn = new Audio(cat);
        catIn.volume = 1;
      });

      await catIn.play();
    } catch (error) {
      console.error("Failed to fetch or play audio:", error);
    }
  };

  useEffect(() => {
    bgmPlayer();
    setIsVisible(true); // コンポーネントが更新されたときにアニメーションを表示状態にリセット
    const timer = setTimeout(() => {
      setIsVisible(false); // アニメーションを非表示にする
      if (catIn) {
        catIn.pause();
        catIn = null;
      }
    }, 2000); // アニメーションの時間を2秒に変更

    return () => clearTimeout(timer);
  }, [arg]); // argの値が変わるたびにエフェクトを再実行

  return isVisible ? (
    <div className="img-wrap size-full">
      <img src={img[arg]} className="cutin size-full" alt="cutin" />
    </div>
  ) : null;
};
