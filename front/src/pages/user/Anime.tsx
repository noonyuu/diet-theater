import React from "react";
import { Animation } from "./animation/Animation";
import { Ending } from "./animation/ending/Ending";
import { Opning } from "./animation/opning/Opning";

export const Anime = () => {
  const argValue = 3;
  return (
    <div>
      {/* <Animation arg={2}></Animation> */}
      <Opning></Opning>
    </div>
  );
};
