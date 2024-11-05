import React from "react";
import { FC, useEffect } from "react";
import { useKey } from "../../hooks/useKey";
import { Speech } from "../../types/speech";

interface Entity {
  text: string;
  speech: Speech[];
  next: () => void;
  currSpeechRecord: number;
}

let audioInstance: HTMLAudioElement | null = null;
var key = import.meta.env.VITE_APP_ZUNDA_KEY;

export const AudioPlayer = async (text: string, next: () => void) => {
  try {
    if (audioInstance) {
      // 既存の音声が再生中であれば一度停止
      audioInstance.pause();
      audioInstance = null;
    }

    const response = await fetch(
      `https://deprecatedapis.tts.quest/v2/voicevox/audio/?key=${key}&speaker=4&pitch=0&intonationScale=1&speed=1.5&text=${encodeURIComponent(
        text,
      )}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    audioInstance = new Audio(URL.createObjectURL(blob));

    audioInstance.addEventListener("ended", () => {
      console.log("Audio ended, moving to next");
      audioInstance = null;
      next();
    });

    await audioInstance.play();
  } catch (error) {
    console.error("Failed to fetch or play audio:", error);
  }
};

export const AutoVoiceComponent: FC<Entity> = ({ text, next }) => {
 useEffect(() => {
  if (audioInstance === null) {
    AudioPlayer(text, next);
  }
}, [text]);

  return (
    <div>
      {text
        .replaceAll("「", "")
        .replaceAll("」", "")
        .split("。")
        .map((sentence, index, array) => (
          <React.Fragment key={index}>
            {sentence}
            {index !== array.length - 1 && "。"}
            {index !== array.length - 1 && <br />}
          </React.Fragment>
        ))}
    </div>
  );
};
