import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import universe from "./theater_img/universe.png";
import ai from "./theater_img/ai.png";
import boy from "./theater_img/boy.png";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetchSpeech } from "../../../hooks/useFetchSpeech";
import { useKey } from "../../../hooks/useKey";
import { Opening } from "../animation/opening/Opening";

import gif from "../animation/anime_img/amariwakamowo.gif";
import bgm from "../animation/anime_img/BGM.mp3";
import { AutoVoiceComponent } from "../AudioPlayer";
import { Animation } from "../animation/Animation";

let bgmInstance: HTMLAudioElement | null = null;
var path = import.meta.env.VITE_APP_SPEECH_PATH;

export const MainTheater = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const url = path + "select/once/" + location.state.IssueId;

  const [isOpening, setIsOpening] = useState<boolean>(false); // オープニングアニメーションの終了監視フラグ

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(false); //  初回ロード
  const [showAnimation, setShowAnimation] = useState(false);
  const { speech, error, isLoading } = useFetchSpeech(url);
  const [tsukkomi] = useState<string[]>([
    "朝からガチで詰め込んでるな！",
    "委員入れ替わりすぎじゃない!?",
    "理事の選任、さっさと決めちゃおうぜ！",
    "おお、決まった！山本佐知子君と新妻秀規君、期待してるぞ！",
    "国政調査、GO！重要政策と警察について徹底調査だ！",
    "これで決定だ！",
    "過去の失敗をしっかり反省して、みんなが尊重される社会を作るぞ！",
    "これ、絶対にやるべき！過去の傷を癒すために、しっかり補償していこう！",
    "過去の過ちを認めて、今こそ補償を！絶対に必要だ！",
    "さあ、賛成か反対か、意見をぶつけようぜ！",
    "優生手術の補償法案に賛成し、被害者に早く補償を！",
    "旧優生保護法の補償法案、絶対に通せ！周知徹底して、差別を根絶しよう！",
    "旧優生保護法の補償、迅速に成立を！",
    "旧優生保護法の過ち、早急に解決を！",
    "優生保護法の過ち、徹底的に検証せよ！",
    "補償法、賛成するなら手を上げて!",
    "過去を見つめ、未来を変えよう！",
    "若者の未来を大切に！散会します！",
  ]);

  const nameOfMeeting = location.state.NameOfMeeting;

  let newSpeechData;

  if (!speech === null) {
    newSpeechData = { speech };
  }

  useEffect(() => {
    if (!isLoading) {
      setIsFirstLoad(true);
    }
  }, [speech]);

  const { next, back, currSpeechRecord, isFinish } = useKey(
    speech,
    isFirstLoad,
  );

  // スクロールを禁止
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  useEffect(() => {
    // アニメーション表示条件をリセット
    setShowAnimation(false);
    if (speech) {
      if (
        speech[currSpeechRecord] &&
        speech[currSpeechRecord].AnimationPoint !== "0"
      ) {
        // 1秒後にアニメーション表示状態をtrueに設定
        const timer = setTimeout(() => {
          setShowAnimation(true);
        }, 1000);
        // コンポーネントのアンマウント時にタイマーをクリア
        return () => clearTimeout(timer);
      }
    }
  }, [currSpeechRecord, speech]);

  useEffect(() => {
    if (isFinish) {
      // エンディングアニメーションの終了を待つ
      const timer = setTimeout(() => {
        <div id="wrap"></div>;
        // アニメーションが終了したらagenda画面に遷移する
        // bgmと止めてインスタンスを破棄する
        if (bgmInstance) {
          console.log("bgmInstance.pause()");
          bgmInstance.pause();
          bgmInstance = null;
        }
        console.log("not bgm");
        navigate("/agenda");
      }, 1000);

      return () => clearTimeout(timer); // コンポーネントのクリーンアップ時にタイマーをクリア
    }
  }, [isFinish, navigate]);

  const bgmPlayer = async () => {
    try {
      if (bgmInstance) {
        // 既存の音声が再生中であれば一度停止
        bgmInstance.pause();
        bgmInstance = null;
      }

      bgmInstance = new Audio(bgm);

      bgmInstance.volume = 0.2;

      bgmInstance.addEventListener("ended", () => {
        bgmInstance = null;
        // サイド再生する
        bgmInstance = new Audio(bgm);
        bgmInstance.volume = 0.2;
      });

      await bgmInstance.play();
    } catch (error) {
      console.error("Failed to fetch or play audio:", error);
    }
  };

  const [isEndOpening, setIsEndOpening] = useState<boolean>(false);
  // オープニングアニメーションの終了を監視
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEndOpening(true);
    }, 2000);
    return () => clearTimeout(timer); // クリーンアップタイマー
  }, []);
  // オープニングアニメーションの終了後にセリフ表示
  useEffect(() => {
    const timer = setTimeout(async () => {
      setIsOpening(true);
      await bgmPlayer();
    }, 2300);
    return () => clearTimeout(timer); // クリーンアップタイマー
  }, [isEndOpening]);

  return (
    <Box
      sx={{
        backgroundImage: `url(${universe})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "105vh",
      }}
    >
      <Opening />
      {!isOpening ? (
        isEndOpening ? (
          <img src={gif} className="size-full" />
        ) : null
      ) : (
        <Stack spacing={5} className="relative">
          {/* タイトル部分 */}
          <Grid container justifyContent="center">
            <Grid item xs={11.5}>
              {/* タイトル */}
              <Box
                sx={{
                  color: "#073b66",
                  backgroundColor: "#d9eff3",
                  textAlign: "center",
                  border: "10px solid black",
                  borderRadius: "16px",
                }}
              >
                <Typography
                  variant="h1"
                  fontWeight="fontWeightBold"
                  color="#073b66"
                  sx={{
                    fontSize: {
                      xs: "1.5rem", // スマホサイズ
                      md: "3.5rem", // 小型デスクトップ
                      lg: "5.0rem", // 大型デスクトップ
                    },
                  }}
                >
                  {nameOfMeeting}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          {/* メイン部分 */}
          <Grid container justifyContent="center">
            <Grid item container xs={12} justifyContent="center">
              <Grid item xs={5}>
                <Box
                  sx={{
                    // backgroundColor: "#d9eff3",
                    display: "flex", // Flexboxを使用
                    justifyContent: "center", // 横方向の中央揃え
                  }}
                >
                  <img src={ai} alt="ai" />
                </Box>
              </Grid>
              <Grid item xs={7}>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={8}>
                    <Box
                      sx={{
                        backgroundColor: "#d9eff3",
                        border: "10px solid black",
                        borderRadius: "16px",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h1"
                        fontWeight="fontWeightBold"
                        color=""
                        sx={{
                          fontSize: {
                            xs: "1.0rem", // スマホサイズ
                            md: "2.0rem", // 小型デスクトップ
                            lg: "3.0rem", // 大型デスクトップ
                          },
                        }}
                      >
                        {speech &&
                          speech!.length > 0 &&
                          speech![currSpeechRecord] && (
                            <div className="w-full text-center text-[#073b66]">
                              <AutoVoiceComponent
                                text={speech[currSpeechRecord].SpeechSummary}
                                speech={speech}
                                currSpeechRecord={currSpeechRecord}
                                next={next}
                              />
                            </div>
                          )}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Box
                      sx={{
                        backgroundColor: "#d9eff3",
                        border: "10px solid black",
                        borderRadius: "16px",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h1"
                        fontWeight="fontWeightBold"
                        color="#073b66"
                        sx={{
                          fontSize: {
                            xs: "0.5rem", // スマホサイズ
                            md: "1.5rem", // 小型デスクトップ
                            lg: "2.5rem", // 大型デスクトップ
                          },
                        }}
                      >
                        議員情報
                      </Typography>
                      <Typography
                        variant="h1"
                        fontWeight="fontWeightBold"
                        color="#073b66"
                        sx={{
                          fontSize: {
                            xs: "0.5rem", // スマホサイズ
                            md: "1.5rem", // 小型デスクトップ
                            lg: "1.5rem", // 大型デスクトップ
                          },
                        }}
                      >
                        {speech && speech!.length > 0 && (
                          <div>
                            <p className="">
                              名前：{speech![currSpeechRecord].Speaker}
                            </p>
                            <p className=" ">
                              所属：
                              {speech![currSpeechRecord].SpeakerGroup
                                ? speech![currSpeechRecord].SpeakerGroup
                                : "所属なし"}
                            </p>
                            <p className="">
                              役職：
                              {speech![currSpeechRecord].SpeakerRole
                                ? speech![currSpeechRecord].SpeakerRole
                                : "役職なし"}
                            </p>
                          </div>
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* ツッコミ */}
          <Grid container justifyContent="center">
            <Grid item xs={11}>
              <Grid container justifyContent="right">
                <Grid item xs={5}>
                  <Box
                    sx={{
                      backgroundColor: "#d9eff3",
                      border: "10px solid black",
                      borderRadius: "16px",
                      textAlign: "center",
                      display: "flex", // Flexboxを使用
                      alignItems: "center", // 縦方向の中央揃え
                      justifyContent: "center", // 横方向の中央揃え
                      // height: 150,
                    }}
                  >
                    <Typography
                      variant="h1"
                      fontWeight="fontWeightBold"
                      color="#073b66"
                      sx={{
                        fontSize: {
                          xs: "1.0rem", // スマホサイズ
                          md: "2.0rem", // 小型デスクトップ
                          lg: "3.0rem", // 大型デスクトップ
                        },
                        fontFamily: "Reggae, sans-serif",
                      }}
                    >
                      {tsukkomi[currSpeechRecord]}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Box
                    sx={{
                      // backgroundColor: "#d9eff3",
                      textAlign: "center",
                      display: "flex", // Flexboxを使用
                      justifyContent: "center", // 横方向の中央揃え
                    }}
                  >
                    <img src={boy} alt="" />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div className="absolute">
            {showAnimation &&
              speech![currSpeechRecord].AnimationPoint !== "0" && (
                <Animation
                  arg={Number(speech![currSpeechRecord].AnimationPoint)}
                />
              )}
          </div>
        </Stack>
      )}
    </Box>
  );
};
