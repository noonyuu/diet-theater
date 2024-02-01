from flask import Blueprint, request, make_response, jsonify, abort
from api.models import RecordTag, RecordTagSchema
import json

# ルーティング設定
record_tag_router = Blueprint("record_tag_router", __name__)


@record_tag_router.errorhandler(400)
@record_tag_router.errorhandler(401)
@record_tag_router.errorhandler(403)
@record_tag_router.errorhandler(404)
@record_tag_router.errorhandler(405)
@record_tag_router.errorhandler(414)
@record_tag_router.errorhandler(415)
@record_tag_router.errorhandler(416)
def error_handler(err):
    abort(err.code, err.description)

# スピーチレコードの全件取得
@record_tag_router.route("/record_tag/select/all", methods=["GET"])
def getRecordTagList():
    record_tags = RecordTag.getRecordTagList()
    record_tag_schema = RecordTagSchema(many=True)
    try:
        return make_response(
            jsonify(
                {
                    "code": 200,
                    "record_tags": record_tag_schema.dump(record_tags),
                }
            )
        )
    except AttributeError:
        return make_response(
            jsonify(
                {
                    "code": 500,
                    "Internal Server Error": "Data does not exist.",
                }
            )
        )


@record_tag_router.route("/record_tags", methods=["POST"])
def registRecordTag():
    # jsonデータを取得する
    jsonData = json.dumps(request.json)
    recordTagData = json.loads(jsonData)

    if not "issue_id" in recordTagData:
        abort(400, "issue_id is a required!!")

    if not "tag_id" in recordTagData:
        abort(400, "tag_id is a required!!")

    recordTag = RecordTag.registRecordTag(recordTagData)
    recordTag_schema = RecordTagSchema(many=True)

    return make_response(jsonify({"code": 200, "recordTag": recordTag}))
