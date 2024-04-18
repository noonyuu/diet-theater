from flask import Flask, jsonify
from openai import OpenAI
import openai
import os
import requests
from dotenv import load_dotenv
load_dotenv()

CLIENT_SECRET = os.getenv('CLIENT_SECRET')
client = OpenAI(api_key=CLIENT_SECRET)

# 文章を簡潔にする
def gpt_concise(utterance):
  try:
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        response_format={"type":"text"},
        messages=[
            {"role": "system", "content": "これから送る文章を元の文章を活かしつつ最大100文字程度にまとめて(人の名前などは省略しない)"},
            {"role": "user", "content": utterance},
        ]
    )
    print(response.choices[0].message.content)
    return response.choices[0].message.content
  except Exception as e:
    # エラー情報を出力
        print(f"An error occurred: {e}")
        return None
#  文章を幼児にする 
def gpt_chiled(utterance):
  try:
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        response_format={"type":"text"},
        messages=[
            {"role": "system", "content": "これから送る文章を幼稚園児の口調に変換して"},
            {"role": "user", "content": utterance},
        ]
    )
    print(response.choices[0].message.content)
    return response.choices[0].message.content
  except Exception as e:
    # エラー情報を出力
        print(f"An error occurred: {e}")
        return None


app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello World"


@app.route('/<issueID>')
def translation(issueID):
    # NDLのAPIを使用して、指定された議事録のデータを取得
    url = f"https://kokkai.ndl.go.jp/api/speech?issueID={issueID}&recordPacking=json"
    r = requests.get(url)
    data = r.json()

    # JSON構造を作成するための辞書
    all_speech_records = {
        "original_speechRecords": {},
        "concise_speechRecords": {},
        "chiled_speechRecords" : {}
    }

    if "speechRecord" in data:
        # 議事録データが存在する場合
        for idx, record in enumerate(data["speechRecord"]):
            speaker = record.get("speaker", "")
            speakerYomi = record.get("speakerYomi", "")
            speech = record.get("speech", "")

            # 原文モードに全データを追加
            all_speech_records["original_speechRecords"][str(idx)] = {
                "speaker": speaker,
                "speech": speech
            }

            # 簡潔モードに要約されたデータや特定の情報を追加
            concise_speech = gpt_concise(speech)
            all_speech_records["concise_speechRecords"][str(idx)] = {
                "speaker": speaker,
                "speech": concise_speech
            }
            
            # 子供モードに要約されたデータや特定の情報を追加
            chiled_speech = gpt_chiled(concise_speech)
            all_speech_records["chiled_speechRecords"][str(idx)] = {
                "speaker": speakerYomi,
                "speech": chiled_speech
            }

            

    # JSON形式でデータを返す
    return jsonify(all_speech_records)

if __name__ == '__main__':
    app.run()
