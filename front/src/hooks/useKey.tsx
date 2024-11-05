import { useCallback, useEffect, useState } from "react";
import { Speech } from "../types/speech";

export const useKey = (
  speech: Speech[] | null | undefined,
  isFirstLoad?: boolean,
): {
  next: () => void;
  back: () => void;
  currSpeechRecord: number;
  isFinish: boolean;
} => {
  const [currSpeechRecord, setCurrSpeechRecord] = useState<number>(0); //  現在のスピーチレコード
  const [isFinish, setIsFinish] = useState<boolean>(false); //  終了

  useEffect(() => {
    if (isFirstLoad) {
      addEventListener("keyup", (e) => handleKeyUp(e));
    }
  }, [isFirstLoad]);

  const handleKeyUp = useCallback(
    (e: { keyCode: any }) => {
      const keyCode = e.keyCode;

      if (keyCode === 37) {
        back();
      }
      if (keyCode === 39) {
        next();
      }
    },
    [isFirstLoad],
  );

  // 次のスピーチレコード
  const next = () => {
    setCurrSpeechRecord((curr) => {
      if (curr < speech!.length - 1) {
        return curr + 1;
      } else {
        finish();
        return curr;
      }
    });
  };

  // 前のスピーチレコード
  const back = () => {
    setCurrSpeechRecord((curr) => {
      return curr === 0 ? curr : curr - 1;
    });
  };

  const finish = () => {
    setIsFinish(true);
  };

  return {
    next: next,
    back: back,
    currSpeechRecord: currSpeechRecord,
    isFinish: isFinish,
  };
};
