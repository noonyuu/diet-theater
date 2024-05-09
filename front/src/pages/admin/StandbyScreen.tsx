import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MaterialSymbolsSearch } from "../../assets/Search";

const StandbyScreen = () => {
  const [issueDate, setIssueDate] = useState<Object>({});
  const { issueID } = useParams<{ issueID: string }>();

  useEffect(() => {
    const fetchMeetingList = async () => {
      console.log("issueID", issueID);
      try {
        const dietData = await axios.get(
          `https://kokkai.ndl.go.jp/api/meeting?issueID=${issueID}&recordPacking=json`,
        );
        setIssueDate(dietData.data.meetingRecord);
        console.log("fetched data", typeof dietData.data.meetingRecord);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchMeetingList();
  }, [issueID]);

  useEffect(() => {
    if (Object.entries(issueDate).length > 0) {
      console.log("issueDate", issueDate);
    }
  }, [issueDate]);

  return (
    <main className="mt-16 flex-1 bg-bac-main">
      {/* {Object.entries(issueDate).map(([key, value]) => (
        <div key={key}>
          <div>
            {key}: {JSON.stringify(value)}
          </div>
        </div>
      ))} */}
      {/* 決まったこと */}
      
    </main>
  );
};

export default StandbyScreen;
