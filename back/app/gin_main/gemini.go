package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

var models *genai.GenerativeModel

func GeminiInit() {
	// Gemini API の API キー
	err := error(nil)
	models, err = GeminiAI(os.Getenv("GEMINI_API_KEY"))
	if err != nil {
		log.Fatal(err)
	}
}

func GeminiAI(apiKey string) (*genai.GenerativeModel, error) {
	c := context.Background()
	client, err := genai.NewClient(c, option.WithAPIKey(apiKey))
	if err != nil {
		return nil, err
	}
	// モデルを初期化
	model := client.GenerativeModel("gemini-1.0-pro")
	return model, nil
}

// AIに問い合わせ
func QuestionAI(issueID string) ([]map[string]interface{}, error) {
	c := context.Background()
	//モデル取得
	aiModel := models

	url := "https://kokkai.ndl.go.jp/api/speech?issueID=" + issueID + "&recordPacking=json"
	dietRes, err := http.Get(url)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer dietRes.Body.Close()
	byteArray, err := io.ReadAll(dietRes.Body)
	if err != nil {
		log.Println(err)
		return nil, err
	}
	// レスポンスをパース
	var data map[string]interface{}
	err = json.Unmarshal(byteArray, &data)
	if err != nil {
		log.Println(err)
		return nil, err
	}
	var speeches []map[string]interface{}// speechデータを集めるスライス
	var count int = 0
	// speechRecordキーからデータを取得し、speechキーに関連するデータを表示
	if speechRecords, ok := data["speechRecord"].([]interface{}); ok {
		for _, record := range speechRecords {
			if speechRecord, ok := record.(map[string]interface{}); ok {
				if speech, ok := speechRecord["speech"].(string); ok {
					speaker := speechRecord["speaker"].(string)
					if count == 0 {
						count++
						continue
					}
					if count == 2 {
						break
					}
					//生成
					query := "あなたは小学生です\n" + speech + "\n〔〕や()の中身は無視してこの文章を50字以内で小学生でも理解できる口調にして要約してください。文章は全て「」に入れて)" // ここで文字列を正しく結合
					var response, err = aiModel.GenerateContent(c, genai.Text(query))
					if err != nil {
						log.Println(err)
						return nil, err
					}
					newSpeaker := printResponse(response)
					mixDate := map[string]interface{}{
						"speaker": speaker,
						"speech":  newSpeaker,
					}
					speeches = append(speeches, mixDate) // speechデータをスライスに追加
				}
			}
		}
	}
	return speeches, nil
}

func printResponse(resp *genai.GenerateContentResponse) string {
	resultText := ""
	for _, cand := range resp.Candidates {
		if cand.Content != nil {
			for _, part := range cand.Content.Parts {
				resultText += fmt.Sprint(part)
			}
		}
	}
	return resultText
}

// AIに聞く
func CallAI(issueID string) ([]map[string]interface{}, error) {
	//AI生成
	aiGenerate, err := QuestionAI(issueID)
	if err != nil {
		log.Println(err)
		return nil, nil
	}

	return aiGenerate, nil
}
