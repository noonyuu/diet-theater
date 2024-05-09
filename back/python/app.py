from flask import Flask, jsonify
from openai import OpenAI
import openai
import os
import requests
import itertools
import time

CLIENT_SECRET = os.getenv('CLIENT_SECRET')
client = OpenAI(api_key=CLIENT_SECRET)

# 文章を簡潔にする
def gpt_concise(utterance):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-1106",
            response_format={"type":"text"},
            messages=[
                {"role": "system", "content": "あなたは小学生です"},
                {"role": "assistant", "content": utterance},
                {"role": "user", "content": "〔〕や()の中身は無視してこの文章を50字以内で小学生でも理解できる口調にして要約してください。文章は全て「」に入れて"},
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
        # "chiled_speechRecords" : {}
    }

    all_speech_records = {"message": []}
    if "speechRecord" in data:
        # 議事録データが存在する場合
        utterances = [record["speech"] for record in data["speechRecord"]]
        # スピーチのバッチを作成
        batch_size = 3  # OpenAIのAPIのレート制限に合わせて適切なバッチサイズを設定します
        batches = [utterances[i:i+batch_size] for i in range(0, len(utterances), batch_size)]
        # for idx, record in enumerate(data["speechRecord"]):
        #     speaker = record.get("speaker", "")
        #     speakerYomi = record.get("speakerYomi", "")
        #     speakerGroup = record.get("speakerGroup", "")
        #     speakerPosition = record.get("speakerPosition","")
        #     speech = record.get("speech", "")



        #     # 原文モードに全データを追加
        #     all_speech_records["original_speechRecords"][str(idx)] = {
        #         "speaker": speaker,
        #         "speakerYomi": speakerYomi,
        #         "speakerGroup": speakerGroup,
        #         "speakerPosition":speakerPosition,
        #         "speech": speech
        #     }

        #     # 簡潔モードに要約されたデータや特定の情報を追加
        #     concise_speech = gpt_concise(speech)
        #     if concise_speech is None:
        #         # OpenAI APIの制限に達した場合、20秒待機してリトライ
        #         time.sleep(20)
        #         concise_speech = gpt_concise(speech)  # 再試行
        #     all_speech_records["concise_speechRecords"][str(idx)] = {
        #         "speaker": speaker,
        #         "speakerYomi": speakerYomi,
        #         "speakerGroup": speakerGroup,
        #         "speakerPosition":speakerPosition,
        #         "speech": concise_speech
        #     }
        for record in data["speechRecord"]:
            speaker = record.get("speaker", "")
            speech = record.get("speech", "")
            # 簡潔モードに要約されたデータや特定の情報を追加
            concise_speech = gpt_concise(speech)
            if concise_speech is None:
                # OpenAI APIの制限に達した場合、20秒待機してリトライ
                time.sleep(20)
                concise_speech = gpt_concise(speech)  # 再試行
            # "message" キーの配列に新しい発言記録を追加
            all_speech_records["message"].append({
                "speaker": speaker,
                "speech": concise_speech
            })
    # JSON形式でデータを返す
    return jsonify(all_speech_records)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5050, debug=False)

