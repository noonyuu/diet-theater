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

var model *genai.GenerativeModel

func GeminiInit() {
	// Gemini API の API キー
	err := error(nil)
	model, err = GeminiAI(os.Getenv("GEMINI_API_KEY"))
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
func QuestionAI(issueID string) ([]string, error) {
	c := context.Background()
	//モデル取得
	ai_model := model

	url := "https://kokkai.ndl.go.jp/api/speech?issueID=" + issueID + "&recordPacking=json"
	diet_res, err := http.Get(url)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer diet_res.Body.Close()
	byte_array, err := io.ReadAll(diet_res.Body)
	if err != nil {
		log.Println(err)
		return nil, err
	}
	// レスポンスをパース
	var data map[string]interface{}
	err = json.Unmarshal(byte_array, &data)
	if err != nil {
		log.Println(err)
		return nil, err
	}
	var speeches []string // speechデータを集めるスライス
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
					query := speech + "\nこの話を要点を押さえつつ最大100文字程度にまとめてください(人の名前などは省略しない)" // ここで文字列を正しく結合
					var response, err = ai_model.GenerateContent(c, genai.Text(query))
					if err != nil {
						log.Println(err)
						return nil, err
					}
					fmt.Println(speaker)
					speeches = append(speeches, printResponse(response)) // `speech`データをスライスに追加
				}
			}
		}
	}
	return speeches, nil
}

func printResponse(resp *genai.GenerateContentResponse) string {
	result_text := ""
	for _, cand := range resp.Candidates {
		if cand.Content != nil {
			for _, part := range cand.Content.Parts {
				result_text += fmt.Sprint(part)
			}
		}
	}
	return result_text
}

// AIに聞く
func CallAI(id string, issueID string) ([]string, error) {
	//AI生成
	ai_generate, err := QuestionAI(issueID)
	if err != nil {
		log.Println(err)
		return nil, nil
	}

	return ai_generate, nil
}
