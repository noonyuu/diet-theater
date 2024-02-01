from flask import Blueprint, request, make_response, jsonify, abort
from api.models import MeetingRecord, MeetingRecordSchema
import json

# ルーティング設定
meeting_record_router = Blueprint("meeting_record_router", __name__)


@meeting_record_router.errorhandler(400)
@meeting_record_router.errorhandler(401)
@meeting_record_router.errorhandler(403)
@meeting_record_router.errorhandler(404)
@meeting_record_router.errorhandler(405)
@meeting_record_router.errorhandler(414)
@meeting_record_router.errorhandler(415)
@meeting_record_router.errorhandler(416)
def error_handler(err):
    abort(err.code, err.description)


# 会議レコードの全件取得
@meeting_record_router.route("/meeting_record/select/all", methods=["GET"])
def getMeetingRecordAll():
    meeting_record_all = MeetingRecord.getMeetingRecordAll()
    meeting_record_schema = MeetingRecordSchema(many=True)

    try:
        return make_response(
            jsonify(
                {
                    "code": 200,
                    "meeting_record_all": meeting_record_schema.dump(
                        meeting_record_all
                    ),
                }
            )
        )
    except Exception as e:
        abort(400, e.args)


# 会議レコードの一件取得
@meeting_record_router.route("/meeting_record/select/once", methods=["POST"])
def getMeetingRecordOnce():
    requested_json = json.dumps(request.json)
    requested_meeting_record = json.loads(requested_json)

    if not "issue_id" in requested_meeting_record:
        abort(400, "issue_id is a required!!")

    meeting_record_once = MeetingRecord.getMeetingRecordOnce(requested_meeting_record)
    meeting_record_schema = MeetingRecordSchema()

    try:
        return make_response(
            jsonify(
                {
                    "code": 200,
                    "meeting_record_once": meeting_record_schema.dump(
                        meeting_record_once
                    ),
                }
            )
        )
    except Exception as e:
        abort(400, e.args)


# 会議レコードの登録
@meeting_record_router.route("/meeting_record/insert", methods=["POST"])
def registMeetingRecord():
    requested_json = json.dumps(request.json)
    requested_meeting_record = json.loads(requested_json)

    if not "issue_id" in requested_meeting_record:
        abort(400, "issue_id is a required!!")

    if not "session" in requested_meeting_record:
        abort(400, "session is a required!!")

    if not "name_of_house" in requested_meeting_record:
        abort(400, "name_of_house is a required!!")

    if not "name_of_meeting" in requested_meeting_record:
        abort(400, "name_of_meeting is a required!!")

    if not "issue" in requested_meeting_record:
        abort(400, "issue is a required!!")

    if not "date" in requested_meeting_record:
        abort(400, "date is a required!!")

    registered_meeting_record = MeetingRecord.registMeetingRecord(
        requested_meeting_record
    )
    meeting_record_schema = MeetingRecordSchema()

    try:
        return make_response(
            jsonify(
                {
                    "code": 200,
                    "registered_meeting_record": meeting_record_schema.dump(
                        registered_meeting_record
                    ),
                }
            )
        )
    except Exception as e:
        abort(400, e.args)


# 会議レコードの更新
@meeting_record_router.route("/meeting_record/update", methods=["POST"])
def updateMeetingRecord():
    requested_json = json.dumps(request.json)
    requested_meeting_record = json.loads(requested_json)

    if not "issue_id" in requested_meeting_record:
        abort(400, "issue_id is a required!!")

    if not "session" in requested_meeting_record:
        abort(400, "session is a required!!")

    if not "name_of_house" in requested_meeting_record:
        abort(400, "name_of_house is a required!!")

    if not "name_of_meeting" in requested_meeting_record:
        abort(400, "name_of_meeting is a required!!")

    if not "issue" in requested_meeting_record:
        abort(400, "issue is a required!!")

    if not "date" in requested_meeting_record:
        abort(400, "date is a required!!")

    updated_meeting_record = MeetingRecord.updateMeetingRecord(requested_meeting_record)
    meeting_record_schema = MeetingRecordSchema()
    try:
        return make_response(
            jsonify(
                {
                    "code": 200,
                    "updated_meeting_record": meeting_record_schema.dump(
                        updated_meeting_record
                    ),
                }
            )
        )
    except Exception as e:
        abort(400, e.args)


# 会議レコードの削除
@meeting_record_router.route("/meeting_record/delete", methods=["POST"])
def deleteMeetingRecord():
    requested_json = json.dumps(request.json)
    requested_meeting_record = json.loads(requested_json)

    if not "issue_id" in requested_meeting_record:
        abort(400, "issue_id is a required!!")

    deleted_meeting_record = MeetingRecord.deleteMeetingRecord(requested_meeting_record)
    meeting_record_schema = MeetingRecordSchema(many=True)
    try:
        return make_response(
            jsonify(
                {
                    "code": 200,
                    "deleted_meeting_record": meeting_record_schema.dump(
                        deleted_meeting_record
                    ),
                }
            )
        )
    except Exception as e:
        abort(400, e.args)


# シェイフーン用
# 料理情報
@meeting_record_router.route("/meeting_record/select/cheifoon", methods=["GET"])
def getMeetingRecordCheifoon():
    try:
        return make_response(jsonify({"code": 200, "recipe": "カレー"}))
    except Exception as e:
        abort(400, e.args)
