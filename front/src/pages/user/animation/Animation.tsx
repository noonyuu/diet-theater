import React, { useEffect, useState } from "react";
import "./animation.css";
import objection from "../animation/anime_img/objection.png";
import no_objection from "../animation/anime_img/no_objection.png";
import standup from "../animation/anime_img/standup.png";
import clap from "../animation/anime_img/clap.png";
import hand_up from "../animation/anime_img/hand_up.png";

export const Animation = ({ arg }: { arg: number}) => {
  const [isVisible, setIsVisible] = useState(true);

  const img = ["",no_objection, objection, standup, clap, hand_up];

  useEffect(() => {
    setIsVisible(true); // コンポーネントが更新されたときにアニメーションを表示状態にリセット
    const timer = setTimeout(() => {
      setIsVisible(false); // アニメーションを非表示にする
    }, 2000); // アニメーションの時間を2秒に変更

    return () => clearTimeout(timer);
  }, [arg]); // argの値が変わるたびにエフェクトを再実行

  return isVisible ? (
    <div className="img-wrap size-full">
      <img src={img[arg]} className="cutin size-full" alt="cutin" />
    </div>
  ) : null;
};
