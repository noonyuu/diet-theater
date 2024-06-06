import React, { useEffect, useRef, useState } from "react";

const DayBox = () => {
  const [date, setDate] = useState(new Map());
  const [year, setYear] = useState<number>();

  const dayName = ["日", "月", "火", "水", "木", "金", "土"];
  useEffect(() => {
    const data = new Map();
    // 新しいDateインスタンスを作成してループのたびに使用
    for (let i = 0; i < 7; i++) {
      const dates = new Date();
      dates.setDate(dates.getDate() + i);
      console.log(dates.getMonth().toString());
      const today: string =
        (dates.getMonth() + 1).toString() +
        "/" +
        dates.getDate().toString() +
        "(" +
        dayName[dates.getDay()] +
        ")";
      setYear(dates.getFullYear());
      data.set(i, today);
    }
    date.clear();
    setDate(data);
  }, []);

  useEffect(() => {
    console.log(date);
  }, [date]);

  const back = () => {
    console.log("back");
    // 左端の日付を取得
    // const nowDate = date.get(0).match(/[/](.*)[(]/)[1];
    const nowDate: string = date
      .get(0)
      .toString()
      .match(/(.*)[(]/)[1];
    const nowDay: string = year + "/" + nowDate;
    const data = new Map();
    let counter: number = 6;
    for (let i = 1; i <= 7; i++) {
      const dates = new Date(nowDay);
      dates.setDate(dates.getDate() - i);
      console.log(dates.getMonth().toString());
      const today: string =
        (dates.getMonth() + 1).toString() +
        "/" +
        dates.getDate().toString() +
        "(" +
        dayName[dates.getDay()] +
        ")";
      setYear(dates.getFullYear());
      data.set(counter, today);
      counter--;
    }
    const reverse = new Map([...data].reverse()); // 逆順にする
    date.clear();
    setDate(reverse);
    console.log("back", date);
  };

  const next = () => {
    console.log("next");
    const nowDate: string = date
      .get(6)
      .toString()
      .match(/(.*)[(]/)[1];
    const nowDay: string = year + "/" + nowDate;
    const data = new Map();
    let counter: number = 0;
    for (let i = 1; i <= 7; i++) {
      const dates = new Date(nowDay);
      dates.setDate(dates.getDate() + i);
      console.log(dates.getMonth().toString());
      const today: string =
        (dates.getMonth() + 1).toString() +
        "/" +
        dates.getDate().toString() +
        "(" +
        dayName[dates.getDay()] +
        ")";
      setYear(dates.getFullYear());
      data.set(counter, today);
      counter++;
    }
    date.clear();
    setDate(data);
    console.log("back", date);
  };

  return (
    <div className="">
      {/* 7日前に */}
      {/* {year} */}
      <div className="flex justify-center overflow-x-auto">
        <div className="my-auto">
          <button className="w-8 text-lg" onClick={() => back()}>
            &lt;
          </button>
        </div>
        {Array.from(date).map(([keys, value]) => {
          return (
            <div className="h-32 w-48 border" key={keys}>
              <div className="h-10 border-b">
                <p className="text-center leading-10">{value}</p>
              </div>
              {/* 日付ごとの会議 */}
              <ul className="m-2">
                <li>
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap text-center">
                    予算委員会予算委員会予算委員会
                  </p>
                </li>
              </ul>
            </div>
          );
        })}
        {/* 7日後に */}
        <div className="my-auto">
          <button className="w-8 text-lg" onClick={() => next()}>
            &gt;
          </button>
        </div>
      </div>

      <div>
        <div className="h-40 w-full bg-red-300"></div>
      </div>
    </div>
  );
};

export default DayBox;
