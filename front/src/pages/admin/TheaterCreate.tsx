import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFetcher, useParams } from "react-router-dom";

const TheaterCreate = () => {
  const { issueID } = useParams();

  const [nameOfMeeting, setNameOfMeeting] = useState<string>();
  const [date, setDate] = useState<string>();
  const [nameOfHouse, setNameOfHouse] = useState<string>();

  interface MeetingRecord {
    [key: string]: any;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const kobe = await axios.get(
          `https://kokkai.ndl.go.jp/api/meeting?issueID=${issueID}&recordPacking=json`,
        );
        const kobeData = new Map<string, any>(Object.entries(kobe.data));
        const kobeMeetingRecord: MeetingRecord = kobeData.get("meetingRecord");

        var oneData = new Map<string, any>(
          Object.entries(kobeMeetingRecord || {}),
        );
        console.log("TheaterCreate", kobe);
        setNameOfMeeting(oneData.get("0").nameOfMeeting);
        setDate(oneData.get("0").date);
        setNameOfHouse(oneData.get("0").nameOfHouse);
        return oneData;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    fetchData();
  }, [issueID]);

  return (
    <main className="mt-16 flex-1">
      <div className="mt-24">
        {/* API取得データ */}
        <div className="flex justify-center">
          <div className="flex w-full justify-center">{nameOfHouse}</div>
          <div className="flex w-full justify-center">{nameOfMeeting}</div>
          <div className="flex w-full justify-center">{date}</div>
        </div>
        {/* 原文・要約比較 */}
        <div className="mx-auto mt-8 flex w-3/4">
          {/* 原文 */}
          <div className="w-1/2 border">
            <p className="text-center border-b">原文</p>
            <div className="">
              <div className="mx-auto my-4 h-16 w-5/6 border">d</div>
            </div>
          </div>
          {/* 要約 */}
          <div className="w-1/2 border">
            <p className="text-center border-b">要約</p>
            <div className="">
              <div className="mx-auto my-4 h-16 w-5/6 border">d</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TheaterCreate;
