import axios from "axios";

interface MeetingRecord {
  [key: string]: any;
}

export const getPostData = async (): Promise<Map<string, any> | null> => {
  try {
    const response = await axios.get(
      "https://kokkai.ndl.go.jp/api/meeting?sessionFrom=1&sessionTo=10&nameOfHouse=両院協議会&issueFrom=1&maximumRecords=5&recordPacking=json",
    );

    const kobe = await axios.get(
      "https://kokkai.ndl.go.jp/api/meeting?issueID=121305261X00920240214&recordPacking=json",
    );
    const kobeData = new Map<string, any>(Object.entries(kobe.data));
    const kobeMeetingRecord: MeetingRecord = kobeData.get("meetingRecord");
    const kobeOneData = new Map<string, any>(
      Object.entries(kobeMeetingRecord || {}),
    );
    console.log("kobeOneData", kobeOneData);

    const dataMap = new Map<string, any>(Object.entries(response.data));
    const meetingRecord: MeetingRecord = dataMap.get("meetingRecord");

    if (!meetingRecord) {
      return null;
    }

    var oneData = new Map<string, any>(Object.entries(meetingRecord || {}));
    

    oneData.set("5", kobeOneData.get("0"));
    console.log("oneData", oneData);

    oneData.forEach((element: any) => {
      console.log("speechRecord", element);
    });

    return oneData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
