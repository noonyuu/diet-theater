package main

import (
	"api/database"
	"api/middleware"
	"bytes"
	"io"

	"net/http"

	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func loadEnv() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Panicln("読み込み出来ませんでした: %v", err)
	}
}

type IssueID struct {
	IssueID string `json:"issueID"`
}

func hello(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Hello, World!",
	})
}

func main() {
	loadEnv()
	middleware.Init()
	// GeminiInit()

	err := database.Init()

	//エラー処理
	if err != nil {
		//パニックを起こす
		log.Fatalln(err)
	}

	server := gin.Default()

	server.GET("/", func(c *gin.Context) {
		fmt.Println("Hello, World!")
		// c.Redirect(http.StatusTemporaryRedirect, "/")
		c.JSON(200, gin.H{
			"message": "Hello, World!!!!!!!!!!!!",
		})
	})

	// geminiに問い合わせ
	// server.POST("/summary", func(c *gin.Context) {
	// 	fmt.Println("summary post")
	// 	var issue IssueID
	// 	if err := c.ShouldBindJSON(&issue); err != nil {
	// 		log.Println(err)
	// 		//エラーを返す
	// 		c.JSON(500, gin.H{"message": err.Error()})
	// 		return
	// 	}

	// 	result, err := CallAI(issue.IssueID)
	// 	if err != nil {
	// 		log.Println(err)
	// 		c.JSON(500, gin.H{"message": err.Error()})
	// 		return
	// 	}
	// 	fmt.Println(issue)
	// 	c.JSON(200, gin.H{
	// 		"message": result,
	// 	})
	// })

	// 会議レコードの登録
	server.POST("/meeting_record/insert", func(c *gin.Context) {
		fmt.Println("meeting_record insert")
		meetingRecord := new(database.MeetingRecord)
		if err := c.ShouldBindJSON(meetingRecord); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		dbConn, err := database.GetDB()
		if err != nil {
			// データベース接続の取得に失敗した場合のエラーハンドリング
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database."})
			return
		}
		if dbConn == nil {
			// dbConnがnilの場合のエラーハンドリング
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection is nil."})
			return
		}

		tx := dbConn.Begin() // トランザクションの開始
		if err := tx.Create(meetingRecord).Error; err != nil {
			tx.Rollback() // エラーが発生した場合はロールバック
			c.JSON(http.StatusInternalServerError, err)
			return
		}
		tx.Commit() // トランザクションのコミット
		c.JSON(http.StatusCreated, meetingRecord)
	})
	//	会議レコードの全件取得
	server.GET("/meeting_record/select/all", func(c *gin.Context) {
		var meetingRecords []database.MeetingRecord

		dbConn, err := database.GetDB()
		if err != nil {
			// データベース接続の取得に失敗した場合のエラーハンドリング
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database."})
			return
		}
		if dbConn == nil {
			// dbConnがnilの場合のエラーハンドリング
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection is nil."})
			return
		}

		if err := dbConn.Find(&meetingRecords).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, meetingRecords)
	})
	// 会議レコードの一件取得
	server.GET("/meeting_record/select/once/:issueID", func(c *gin.Context) {
		issueID := c.Param("issueID")
		var meetingRecord database.MeetingRecord

		dbConn, err := database.GetDB()
		if err != nil {
			// データベース接続の取得に失敗した場合のエラーハンドリング
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database."})
			return
		}
		if dbConn == nil {
			// dbConnがnilの場合のエラーハンドリング
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection is nil."})
			return
		}

		if err := dbConn.Where("issue_id = ?", issueID).First(&meetingRecord).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, meetingRecord)
	})
	//	発言レコードの登録
	server.POST("/speech_record/insert", func(c *gin.Context) {
		fmt.Println("speech_record insert")
		// リクエストボディを読み取る
		bodyBytes, err := io.ReadAll(c.Request.Body)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		// ioutil.ReadAllで読み取った後、c.Request.Bodyは空になるので、
		// 読み取った内容を再度c.Request.Bodyに設定する
		c.Request.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))

		// リクエストボディの内容をログに出力
		fmt.Println(string(bodyBytes))
		var speechRecords []*database.SpeechRecord
		if err := c.ShouldBindJSON(&speechRecords); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		dbConn, err := database.GetDB()
		if err != nil {
			// データベース接続の取得に失敗した場合のエラーハンドリング
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database."})
			return
		}
		if dbConn == nil {
			// dbConnがnilの場合のエラーハンドリング
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection is nil."})
			return
		}

		tx := dbConn.Begin() // トランザクションの開始
		for _, speechRecord := range speechRecords {
			if err := tx.Create(&speechRecord).Error; err != nil {
				tx.Rollback() // エラーが発生した場合はロールバック
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
		}
		tx.Commit() // トランザクションのコミット
		c.JSON(http.StatusCreated, speechRecords)
	})
	//	発言レコードの全件取得
	server.GET("/speech_record/select/all", func(c *gin.Context) {
		var speechRecords []database.SpeechRecord

		dbConn, err := database.GetDB()
		if err != nil {
			// データベース接続の取得に失敗した場合のエラーハンドリング
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database."})
			return
		}
		if dbConn == nil {
			// dbConnがnilの場合のエラーハンドリング
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection is nil."})
			return
		}

		if err := dbConn.Find(&speechRecords).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, speechRecords)
	})
	// 	発言レコードの一件取得
	server.GET("/speech_record/select/once/:issueID", func(c *gin.Context) {
		issueID := c.Param("issueID")
		var speechRecords []database.SpeechRecord

		dbConn, err := database.GetDB()
		if err != nil {
			// データベース接続の取得に失敗した場合のエラーハンドリング
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database."})
			return
		}
		if dbConn == nil {
			// dbConnがnilの場合のエラーハンドリング
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection is nil."})
			return
		}

		if err := dbConn.Where("issue_id = ?", issueID).Find(&speechRecords).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, speechRecords)
	})

	// 	発言レコードの一件取得
	server.GET("/speech_record/select/once/:issueID/:speechID", func(c *gin.Context) {
		issueID := c.Param("issueID")
		speechID := c.Param("speechID")
		var speechRecord database.SpeechRecord

		dbConn, err := database.GetDB()
		if err != nil {
			// データベース接続の取得に失敗した場合のエラーハンドリング
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database."})
			return
		}
		if dbConn == nil {
			// dbConnがnilの場合のエラーハンドリング
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection is nil."})
			return
		}

		if err := dbConn.Where("issue_id = ? AND speech_id = ?", issueID, speechID).First(&speechRecord).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, speechRecord)
	})
	/**
	 * 以下はテスト用のエンドポイント
	 */
	//  接続テスト用のエンドポイント
	// 	server.POST("/speech_record/insert", func(c *gin.Context) {
	// 	fmt.Println("speech_record insert")

	// 	// リクエストボディを読み取る
	// 	bodyBytes, err := io.ReadAll(c.Request.Body)
	// 	if err != nil {
	// 		// エラーがあれば、クライアントにエラーを返す
	// 		c.JSON(500, gin.H{"error": "リクエストボディの読み取りに失敗しました"})
	// 		return
	// 	}

	// 	// 読み取ったボディを文字列として出力する
	// 	bodyString := string(bodyBytes)
	// 	fmt.Println(bodyString)

	// 	// 処理が成功した場合、適切なレスポンスを返す
	// 	c.JSON(200, gin.H{"message": "正常に処理されました"})
	// })
	// SpeakerText 構造体を定義
	type SpeakerText struct {
		Speaker string `json:"speaker"`
		Speech  string `json:"speech"`
	}

	server.GET("/test", func(c *gin.Context) {
		test := []SpeakerText{
			{Speaker: "石田博英", Speech: "石田議長が本両院協議会の議長に就任。各議院の議長および副議長が発表された。本案は傍聴が認められないため、関係者以外の退室が求められた。協議に入る前に、衆議院から両院協議会を求めた理由と衆議院側の趣旨の説明が行われる。"},
			{Speaker: "西村直己", Speech: "衆議院から修正案が提出された。主な内容は以下の通り。\n\n* 「とうもろこし」など7品目を1年間免税\n* ガソリン・潤滑油を10%減税\n* 建染染料（人造藍を除く）の従価税率を1年間15%に明確化（政府案では「当分の間」15%）"},
			{Speaker: "石田博英", Speech: "石田博英議長が、参議院側の議決の趣旨を説明し、要点は次の通り。\n\n* 法案を可決する。\n* 国民の生命、健康を守るために緊急避難的な措置が必要と判断。\n* 医療体制の強化に万全を期す。\n* 国民生活への影響を最小限に抑える努力をする。"},
			{Speaker: "小林政夫", Speech: "小林政夫は、衆議院案に一部異議を唱えた。建染染料の関税率は25％とするべきで、飼料の「こうりやん」と油糧種の菜種・からし菜は1年間免税とし、産業近代化のための輸入機械も1年間免税とするよう主張した。この追加修正は工業保護と国民生活への配慮によるものである。"},
			{Speaker: "石田博英", Speech: "石田議長のもと、両院協議会を開催。議決の趣旨に関する説明が行われた後、質疑が行われなかったため、懇談に移って協議が開始された。"},
			{Speaker: "石田博英", Speech: "石田博英議長のもと、懇談会が開催された。懇談会は午後8時46分から5分間行われた。"},
			{Speaker: "石田博英", Speech: "石田議長が衆議院議決案を修正。改正後の関税定率法一部改正案は、協議会案として審議する決定が下された。具体的には、附則第一項の施行日を5月1日に変更し、別表乙号705（合成染料・建染染料）の税率を2%に改定する。"},
			{Speaker: "石田博英", Speech: "石田議長は協議案の採決を行い、総員起立により全員が賛成した。"},
			{Speaker: "石田博英", Speech: "議長は、協議会案が両院協議会の成案になったことを発表。案文整理を議長に委任し、異議がないことを確認した。"},
			{Speaker: "石田博英", Speech: "両院協議会の議長・石田博英が散会を宣言。協議会の任務が終了したことを確認し、午後8時53分に散会。"},
		}

		fmt.Println("test get")
		c.JSON(200, gin.H{
			"message": test,
		})
	})

	server.Run("0.0.0.0:8089")
}
