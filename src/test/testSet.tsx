import DataDefo from "./defo.json";
import Data0 from "./test0.json";
import Data1 from "./test1.json";
import Data2 from "./test2.json";
import Data3 from "./test3.json";

interface SpeechRecord {
  [key: string]: {
    speaker: string;
    speech: string;
  };
}

export const testSetData = (num: string) => {
  let concise: SpeechRecord = DataDefo.all.concise_speechRecords;
  let child: SpeechRecord = DataDefo.all.childe_speechRecords;
  let origin: SpeechRecord = DataDefo.all.original_speechRecords;
  
  switch (num) {
    case "0": {
      concise = Data0.all.concise_speechRecords;
      child = Data0.all.childe_speechRecords;
      origin = Data0.all.original_speechRecords;
      break;
    }
    case "1": {
      concise = Data1.all.concise_speechRecords;
      child = Data1.all.childe_speechRecords;
      origin = Data1.all.original_speechRecords;
      break;
    }
    case "2": {
      concise = Data2.all.concise_speechRecords;
      child = Data2.all.childe_speechRecords;
      origin = Data2.all.original_speechRecords;
      break;
    }
    case "3": {
      concise = Data3.all.concise_speechRecords;
      child = Data3.all.childe_speechRecords;
      origin = Data3.all.original_speechRecords;
      break;
    }
  }

  var list: SpeechRecord[] = [concise, child, origin];

  return list;
};
