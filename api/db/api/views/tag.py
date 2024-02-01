from flask import Blueprint, request, make_response, jsonify, abort
from api.models import Tag, TagSchema
import json

# ルーティング設定
tag_router = Blueprint("tag_router", __name__)


@tag_router.errorhandler(400)
@tag_router.errorhandler(401)
@tag_router.errorhandler(403)
@tag_router.errorhandler(404)
@tag_router.errorhandler(405)
@tag_router.errorhandler(414)
@tag_router.errorhandler(415)
@tag_router.errorhandler(416)
def error_handler(err):
    res = jsonify({"error": {"message": err.description}, "code": err.code})
    return res, err.code


@tag_router.route("/tags", methods=["GET"])
def getTagList():
    tags = Tag.getTagList()
    tag_schema = TagSchema(many=True)
    try:
        return make_response(
            jsonify(
                {
                    "code": 200,
                    "tags": tag_schema.dump(tags),
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


@tag_router.route("/tags", methods=["POST"])
def registTag():
    # jsonデータを取得する
    jsonData = json.dumps(request.json)
    tagData = json.loads(jsonData)

    if not "tag_id" in tagData:
        abort(400, "tag_id is a required!!")

    if not "tag_name" in tagData:
        abort(400, "tag_name is a required!!")

    tag = Tag.registTag(tagData)
    tag_schema = TagSchema(many=True)

    return make_response(jsonify({"code": 200, "tag": tag}))
