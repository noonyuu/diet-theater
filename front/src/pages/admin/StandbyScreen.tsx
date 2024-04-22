import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StandbyScreen = () => {
  const [data, setData] = useState<string>();
  const [datas, setDatas] = useState<string>();
  const { issueID } = useParams();
  useEffect(() => {
    const postGpt = async () => {
      console.log("issueID", issueID);

      const dietData = fetch(
        `https://kokkai.ndl.go.jp/api/meeting_list?issueID=${issueID}`,
      );
      const url: string =
        "https://kokkai.ndl.go.jp/api/meeting_list?issueID=${IssueID}";
      
      // console.log("dir", dietData);
      // const url = "http://localhost:8080/speech_record/insert";
      // const data = [
      //   {
      //     IssueID: "943111dedvv1111111ww",
      //     SpeechID: "23",
      //     Speaker: "name",
      //     SpeekerYomi: "aaaaaa",
      //     SpeakerRole: "24",
      //     SpeakerGroup: "1981-02-27",
      //     SpeakerPosition: "12",
      //     SpeechOrigin: "234erdevddd",
      //     SpeechSummary: "fjaiuehfguqh",
      //     SpeechNanoda: "vdamvioano",
      //   },
      // ];
      // fetch(url, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // })
      //   .then((res) => res.json())
      //   .then((data) => console.log(data))
      //   .catch((error) => console.error(error));
    };

    postGpt();
  }, []);

  return (
    <div>
      <div
        onClick={() => {
          datas ? setDatas("") : setDatas("集中力−89%");
        }}
        className="h-10 w-full bg-red-500 text-center text-3xl leading-10"
      >
        {datas}
      </div>
      <div className="flex w-full justify-center">
        <button
          onClick={() => (data ? setData("") : setData("眠い"))}
          className="size-12 bg-blue-300"
        >
          {data}
        </button>
      </div>
    </div>
  );
};

export default StandbyScreen;
