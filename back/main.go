package main

import (
	"api/handler"
	"api/model"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// sqlDB接続
	model.OpenDB()
	model.Migrate()
	// インスタンスを作成
	e := echo.New()

	// CORSの設定
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3001"}, // Reactアプリケーションのアドレス
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	// ミドルウェアを設定
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// ルートを設定
	e.GET("/", hello)
	e.POST("/meeting_record/insert", handler.CreateMeetingRecord)                       // 会議レコードの登録
	e.GET("/meeting_record/select/once/:issueID", handler.GetMeetingRecordByIssueID)    // 会議レコードの一件取得
	e.GET("/meeting_record/select/all", handler.GetMeetingRecordAll)                    // 会議レコードの全件取得
	e.POST("/speech_record/insert", handler.CreateSpeechRecord)                         // スピーチレコードの登録
	e.GET("/speech_record/select/once/:issueID/:speechID", handler.GetSpeechRecordOnce) // 会議レコードの一件取得
	e.GET("/speech_record/select/all", handler.GetSpeechRecordAll)                      // 会議レコードの全件取得

	e.Logger.Fatal(e.Start(":8080"))
}

// ハンドラーを定義
func hello(c echo.Context) error {
	return c.String(http.StatusOK, "いちごたべさせろ〜")
}
