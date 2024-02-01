from flask import Blueprint, request, make_response, jsonify, abort
from api.models import SpeechRecord, SpeechRecordSchema
import json

# ルーティング設定
speech_record_router = Blueprint("speech_record_router", __name__)


@speech_record_router.errorhandler(400)
@speech_record_router.errorhandler(401)
@speech_record_router.errorhandler(403)
@speech_record_router.errorhandler(404)
@speech_record_router.errorhandler(405)
@speech_record_router.errorhandler(414)
@speech_record_router.errorhandler(415)
@speech_record_router.errorhandler(416)
def error_handler(err):
    abort(err.code, err.description)


# スピーチレコードの全件取得
@speech_record_router.route("/speech_record/select/all", methods=["GET"])
def getSpeechRecordAll():
    registered_speech_record_all = SpeechRecord.getSpeechRecordAll()
    speech_record_schema = SpeechRecordSchema(many=True)
    try:
        return make_response(
            jsonify(
                {
                    "code": 200,
                    "registered_speech_record_all": speech_record_schema.dump(
                        registered_speech_record_all
                    ),
                }
            )
        )
    except Exception as e:
        abort(400, e.args)


# スピーチレコードの会議単位取得
@speech_record_router.route("/speech_record/select/meeting", methods=["POST"])
def getSpeechRecordsOfMeeting():
    requested_json = json.dumps(request.json)
    meeting_record = json.loads(requested_json)

    if not "issue_id" in meeting_record:
        abort(400, "issue_id is a required!!")

    registered_speech_records_of_meeting = SpeechRecord.getSpeechRecordsOfMeeting(
        meeting_record
    )
    speech_record_schema = SpeechRecordSchema(many=True)
    try:
        return make_response(
            jsonify(
                {
                    "code": 200,
                    "registered_speech_records_of_meeting": speech_record_schema.dump(
                        registered_speech_records_of_meeting
                    ),
                }
            )
        )
    except Exception as e:
        abort(400, e.args)


# スピーチレコードの一件取得
@speech_record_router.route("/speech_record/select/once", methods=["POST"])
def getSpeechRecordsOnce():
    requested_json = json.dumps(request.json)
    meeting_record = json.loads(requested_json)

    if not "issue_id" in meeting_record:
        abort(400, "issue_id is a required!!")

    registered_speech_record_once = SpeechRecord.getSpeechRecordsOfMeeting(
        meeting_record
    )
    speech_record_schema = SpeechRecordSchema(many=True)
    try:
        return make_response(
            jsonify(
                {
                    "code": 200,
                    "registered_speech_record_once": speech_record_schema.dump(
                        registered_speech_record_once
                    ),
                }
            )
        )
    except Exception as e:
        abort(400, e.args)


# スピーチレコードの登録
@speech_record_router.route("/speech_record/insert", methods=["POST"])
def registSpeechRecord():
    requested_json = json.dumps(request.json)
    speech_record_data = json.loads(requested_json)

    if not "issue_id" in speech_record_data:
        abort(400, "issue_id is a required!!")

    if not "speech_id" in speech_record_data:
        abort(400, "speech_id is a required!!")

    registered_speech_record = SpeechRecord.registSpeechRecord(speech_record_data)
    speech_record_schema = SpeechRecordSchema(many=True)

    return make_response(
        jsonify(
            {
                "code": 200,
                "registered_speech_record": speech_record_schema.dump(
                    registered_speech_record
                ),
            }
        )
    )


# スピーチレコードの更新
@speech_record_router.route("/speech_record/update", methods=["POST"])
def updateSpeechRecord():
    requested_json = json.dumps(request.json)
    speech_record = json.loads(requested_json)

    if not "issue_id" in speech_record:
        abort(400, "issue_id is a required!!")

    if not "speech_id" in speech_record:
        abort(400, "session is a required!!")

    if not "speaker_yomi" in speech_record:
        abort(400, "name_of_house is a required!!")

    if not "speaker_role" in speech_record:
        abort(400, "name_of_meeting is a required!!")

    if not "speaker_group" in speech_record:
        abort(400, "issue is a required!!")

    if not "speaker_position" in speech_record:
        abort(400, "date is a required!!")

    if not "speech_origin" in speech_record:
        abort(400, "date is a required!!")

    if not "speech_summary" in speech_record:
        abort(400, "date is a required!!")

    if not "speech_nanoda" in speech_record:
        abort(400, "date is a required!!")

    registered_speech_record = SpeechRecord.updateSpeechRecord(speech_record)
    speech_record_schema = SpeechRecordSchema()

    try:
        return make_response(
            jsonify(
                {
                    "code": 200,
                    "registered_speech_record": speech_record_schema.dump(
                        registered_speech_record
                    ),
                }
            )
        )
    except Exception as e:
        abort(400, e.args)


# スピーチレコードの削除
@speech_record_router.route("/speech_record/delete", methods=["POST"])
def deleteSpeechRecords():
    requested_json = json.dumps(request.json)
    speech_record = json.loads(requested_json)

    if not "issue_id" in speech_record:
        abort(400, "issue_id is a required!!")

    registered_speech_record = SpeechRecord.deleteSpeechRecords(speech_record)
    speech_record_schema = SpeechRecordSchema(many=True)
    try:
        return make_response(
            jsonify(
                {
                    "code": 200,
                    "registered_speech_record": speech_record_schema.dump(
                        registered_speech_record
                    ),
                }
            )
        )
    except Exception as e:
        abort(400, e.args)
