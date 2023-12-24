import axios from "axios";

interface MeetingRecord {
  [key: string]: any;
}

const getPostData = async (): Promise<Map<string, any> | null> => {
  try {
    const response = await axios.get(
      "https://kokkai.ndl.go.jp/api/meeting?sessionFrom=1&sessionTo=3&nameOfHouse=両院協議会&issueFrom=1&recordPacking=json",
    );

    const dataMap = new Map<string, any>(Object.entries(response.data));
    const meetingRecord: MeetingRecord = dataMap.get("meetingRecord");

    if (!meetingRecord) {
      return null;
    }

    const oneData = new Map<string, any>(
      Object.entries(meetingRecord["0"] || {}),
    );

    return oneData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default getPostData;
