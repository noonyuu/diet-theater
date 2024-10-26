import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import universe from "./theater_img/universe.png";
import ai from "./theater_img/ai.png";
import boy from "./theater_img/boy.png";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const MainTheater = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${universe})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "105vh",
      }}
    >
      <Stack spacing={5}>
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
                タイトル文章
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
                      color="#073b66"
                      sx={{
                        fontSize: {
                          xs: "1.0rem", // スマホサイズ
                          md: "2.0rem", // 小型デスクトップ
                          lg: "3.0rem", // 大型デスクトップ
                        },
                      }}
                    >
                      〇〇議員がああああ制作を
                      提案しました〇〇議員がああああ制作を
                      提案しました〇〇議員がああああ制作を
                      提案しました〇〇議員がああああ制作を提案しました
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
                      議員名：岸田文雄
                      <br />
                      政党：自民党
                      <br />
                      役割：首相
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
                    height: 150,
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
                    なるほど
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
      </Stack>
    </Box>
  );
};
