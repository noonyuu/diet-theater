import React, { useState } from "react";
import Tab from "./Tab";

const Card = (props: any) => {
  const [tabNum, setTabNum] = useState<number>(0);
  const tabHandler = (tab: number) => {
    setTabNum(tab);
  };

  // テストデータ
  const contents = [
    {
      text: "直近の記事",
      detail: [
        {
          context: "直近の記事",
          path: "http://deit-theater.noonyuu.com",
        },
        {
          context: "直近の記事2",
          path: "http://deit-theater.noonyuu.com2",
        },
      ],
    },
    {
      text: "発言回数",
      detail: [
        {
          context: "発言回数",
          path: "http://deit-theater.noonyuu.com",
        },
        {
          context: "発言回数2",
          path: "http://deit-theater.noonyuu.com2",
        },
      ],
    },
  ];

  const pledge = [
    "あいうえおかきくけこさしすせそたちつてとなにぬねの",
    "あいうえおかきくけこさしすせそたちつてとなにぬねの",
    "あいうえおかきくけこさしすせそたちつてとなにぬねの",
  ]; 

  return (
    <>
      <div className="Kaisei Tokumin h-52 w-44 rounded-md border-2">
        {/* 党 */}
        <div className="h-1/5">
          <div className="relative left-1 top-1 flex size-6 items-center justify-center text-sm text-white">
            自
          </div>
          {/* 議員の名前 */}
          <div className="-translate-y-1/2 text-center text-base text-white">
            岸田文雄
          </div>
        </div>
        {/* 公約 */}
        <div className="scroll-bar h-2/5 overflow-auto p-2 pl-0 text-xs">
          <ul className="">
            {pledge.map((item, index) => (
              <li key={index} className="text-white">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="h-2/5 border-t-2">
          <Tab onChange={tabHandler} data={contents} />
        </div>
      </div>
    </>
  );
};

export default Card;
