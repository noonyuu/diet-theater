import React from "react";
import "./animation.css";
import objection from "../animation/anime_img/objection.png";
import no_objection from "../animation/anime_img/no_objection.png";
import standup from "../animation/anime_img/standup.png";
import clap from "../animation/anime_img/clap.png";

export const Animation = ({ arg }: { arg: number }) => {
  let cutin_img;

  switch (arg) {
    // 異議あり画像を挿入
    case 1:
      cutin_img = objection;
      break;
    // 異議なし画像を挿入
    case 2:
      cutin_img = no_objection;
      break;
    // 賛成者は起立画像を挿入
    case 3:
      cutin_img = standup;
      break;
    // 拍手画像を挿入
    case 4:
      cutin_img = clap;
      break;
  }

  return (
    <div className="img-wrap">
      <img src={cutin_img} className="cutin" alt="cutin" />
    </div>
  );
};
