import React, { FC, useState } from "react";
import style from "./tab.scss";

interface Detail {
  context: string;
  path: string;
}

interface Props {
  onChange: (tab: number) => void | (() => void);
  data: Array<{ text: string; detail: Detail[] }>;
}

const Tab: FC<Props> = ({ onChange, data }) => {
  const [tab, setTab] = useState<number>(0);

  return (
    <div className="w-full pb-8 text-white">
      <div className="flex">
        {data.map((content, index) => (
          <div
            key={index}
            onClick={() => {
              setTab(index);
              onChange(index);
            }}
            className={
              index === tab
                ? "flex h-6 w-1/2 cursor-pointer place-items-center justify-center border-2 text-center text-[0.5rem] font-bold text-black transition-[0.2s]"
                : "flex w-1/2 items-center justify-center text-[0.5rem] text-black"
            }
          >
            {content.text}
          </div>
        ))}
      </div>
      <div>
        {/* 現在選択されているタブの詳細だけを表示 */}
        <div>
          <ul>
            {data[tab].detail.map((detailItem, detailIndex) => (
              <li key={detailIndex}>
                <a href={detailItem.path}>{detailItem.context}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tab;
