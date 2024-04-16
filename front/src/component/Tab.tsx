import React, { FC, useState } from "react";
import style from "./tab.scss";

interface Props {
  onChange: (tab: number) => void | (() => void);
  data: Array<{ text: string; path: string }>;
}

const Tab: FC<Props> = ({ onChange, data }) => {
  const [tab, setTab] = useState<number>(0);

  return (
    <div className="w-full pb-8 text-white">
      <div className="flex">
        {data.map((content, index) => (
          <div
            onClick={() => {
              setTab(index);
              onChange(tab);
            }}
            className={
              index === tab
                ? "flex h-6 w-1/2 cursor-pointer place-items-center justify-center border-2 text-center text-[0.5rem] font-bold text-white transition-[0.2s]"
                : "flex w-1/2 items-center justify-center text-[0.5rem] text-white"
            }
          >
            {content.text}
          </div>
        ))}
      </div>

      <div />
    </div>
  );
};

export default Tab;
