package main

import (
	"api/database"
	"api/middleware"
	"fmt"
	"log"

	// "net/http"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func loadEnv() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Panicln("読み込み出来ませんでした: %v", err)
	}
}

type BookData struct {
	Name string
	ID   string
}

type IssueID struct {
	ID string
}

func main() {
	loadEnv()
	middleware.Init()
	GeminiInit()
	database.OpenDB()

	server := gin.Default()

	server.GET("/", func(c *gin.Context) {
		fmt.Println("Hello, World!")
		// c.Redirect(http.StatusTemporaryRedirect, "/")
		c.JSON(200, gin.H{
			"message": "Hello, World!!!!!!!!!!!!",
		})
	})

	// geminiに問い合わせ
	server.POST("/summary", func(c *gin.Context) {
		fmt.Println("summary post")
		var issue IssueID
		if err := c.ShouldBindJSON(&issue); err != nil {
			log.Println(err)
			//エラーを返す
			c.JSON(500, gin.H{"message": err.Error()})
			return
		}

		result, err := CallAI("1", issue.ID)
		if err != nil {
			log.Println(err)
			c.JSON(500, gin.H{"message": err.Error()})
			return
		}
		fmt.Println(issue)
		c.JSON(200, gin.H{
			"message": result,
		})
	})

	// SpeakerText 構造体を定義
	type SpeakerText struct {
		Speaker string `json:"speaker"`
		Speech  string `json:"speech"`
	}

	server.GET("/test", func(c *gin.Context) {
		// test := map[int]SpeakerText{
		// 	0: {Speaker: "石田博英", Speech: "石田議長が本両院協議会の議長に就任。各議院の議長および副議長が発表された。本案は傍聴が認められないため、関係者以外の退室が求められた。協議に入る前に、衆議院から両院協議会を求めた理由と衆議院側の趣旨の説明が行われる。"},
		// 	1: {Speaker: "西村直己", Speech: "衆議院から修正案が提出された。主な内容は以下の通り。\n\n* 「とうもろこし」など7品目を1年間免税\n* ガソリン・潤滑油を10%減税\n* 建染染料（人造藍を除く）の従価税率を1年間15%に明確化（政府案では「当分の間」15%）"},
		// 	2: {Speaker: "石田博英", Speech: "石田博英議長が、参議院側の議決の趣旨を説明し、要点は次の通り。\n\n* 法案を可決する。\n* 国民の生命、健康を守るために緊急避難的な措置が必要と判断。\n* 医療体制の強化に万全を期す。\n* 国民生活への影響を最小限に抑える努力をする。"},
		// 	3: {Speaker: "小林政夫", Speech: "小林政夫は、衆議院案に一部異議を唱えた。建染染料の関税率は25％とするべきで、飼料の「こうりやん」と油糧種の菜種・からし菜は1年間免税とし、産業近代化のための輸入機械も1年間免税とするよう主張した。この追加修正は工業保護と国民生活への配慮によるものである。"},
		// 	4: {Speaker: "石田博英", Speech: "石田議長のもと、両院協議会を開催。議決の趣旨に関する説明が行われた後、質疑が行われなかったため、懇談に移って協議が開始された。"},
		// 	5: {Speaker: "石田博英", Speech: "石田博英議長のもと、懇談会が開催された。懇談会は午後8時46分から5分間行われた。"},
		// 	6: {Speaker: "石田博英", Speech: "石田議長が衆議院議決案を修正。改正後の関税定率法一部改正案は、協議会案として審議する決定が下された。具体的には、附則第一項の施行日を5月1日に変更し、別表乙号705（合成染料・建染染料）の税率を2%に改定する。"},
		// 	7: {Speaker: "石田博英", Speech: "石田議長は協議案の採決を行い、総員起立により全員が賛成した。"},
		// 	8: {Speaker: "石田博英", Speech: "議長は、協議会案が両院協議会の成案になったことを発表。案文整理を議長に委任し、異議がないことを確認した。"},
		// 	9: {Speaker: "石田博英", Speech: "両院協議会の議長・石田博英が散会を宣言。協議会の任務が終了したことを確認し、午後8時53分に散会。"},
		// }
		test:= []SpeakerText{
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
