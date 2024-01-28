import axios from "axios";
import Data from "../test/test.json";

interface MeetingRecord {
  [key: string]: any;
}

export const getPostDatas = async (): Promise<Map<string, any> | null> => {
  const tasks: any[] = [];
  try {
    const all = Data.all;
    const dataMap = new Map<string, any>(Object.entries(all));
    const meetingRecord: MeetingRecord = dataMap.get("childe_speechRecords");

    if (!meetingRecord) {
      return null;
    }

    const oneData = new Map<string, any>(Object.entries(meetingRecord || {}));

    dataMap.forEach((value, key) => {
      const pickData = new Map(Object.entries(value));

      pickData.forEach((value: any, key: string) => {
        const t = new Map<string, any>(Object.entries(value || {}));
        // const speech = value.get("speech");
        // const speaker = value.get("speaker");

        tasks.push({
          key: "0",
          value: {
            issueID: "100124027X00119470829",
            speechRecord: [
              {
                speaker: t.get("speaker"),
                speech: t.get("speech"),
              },
            ],
          },
        });
      });

      console.log("tasks", tasks);
    });
    const f = new Map<string, any>(Object.entries(tasks || {}));

    return f;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// 実際に関数を呼び出す
getPostDatas();
