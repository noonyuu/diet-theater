from api.database import db, ma, metadata_obj
from flask import abort
from sqlalchemy import and_


class RecordTag(db.Model):
    __table__ = metadata_obj.tables["record_tag"]

    # レコードタグの全件取得
    def getRecordTagAll():
        registered_record_tag_list = db.session.query(RecordTag).all()
        if registered_record_tag_list == None:
            return []
        else:
            return registered_record_tag_list

    # レコードタグの会議単位取得
    def getRecordTagsOfMeeting(requested_meeting_record):
        try:
            registered_record_tags_of_meeting = (
                db.session.query(RecordTag)
                .filter(
                    RecordTag.__table__.columns.issue_id
                    == requested_meeting_record.get("issue_id")
                )
                .all()
            )

        except Exception as e:
            db.session.rollback()
            abort(400, e.args)
        if registered_record_tags_of_meeting == None:
            return []
        else:
            return registered_record_tags_of_meeting

    # レコードタグの一件取得
    def getRecordTag(requested_record_tag):
        try:
            registered_record_tag = (
                db.session.query(RecordTag)
                .filter(
                    and_(
                        RecordTag.__table__.columns.issue_id
                        == requested_record_tag.get("issue_id"),
                        RecordTag.__table__.columns.speech_id
                        == requested_record_tag.get("speech_id"),
                    )
                )
                .first()
            )
        except Exception as e:
            db.session.rollback()
            abort(400, e.args)
        if registered_record_tag == None:
            return None
        else:
            return registered_record_tag

    # レコードタグの登録
    def registRecordTag(requested_record_tag):
        registering_record_tag = RecordTag(
            issue_id=requested_record_tag.get("issue_id"),
            tag_id=requested_record_tag.get("tag_id"),
        )

        db.session.add(registering_record_tag)
        db.session.commit()

        return requested_record_tag

    # レコードタグの更新
    def updateRecordTag(requested_record_tag):
        registered_record_tag = (
            db.session.query(RecordTag)
            .filter(
                RecordTag.__table__.columns.issue_id
                == requested_record_tag.get("issue_id")
            )
            .first()
        )
        try:
            registered_record_tag.issue_id = requested_record_tag.get("issue_id")
            registered_record_tag.tag_id = requested_record_tag.get("tag_id")

        except AttributeError as e:
            db.session.rollback()
            abort(400, "issue_id is not exist!!")
        except Exception as e:
            db.session.rollback()
            abort(400, e.args)
        db.session.add(registered_record_tag)
        db.session.commit()
        return registered_record_tag

    # レコードタグの会議単位削除
    def deleteRecordTagsOfMeeting(requested_meeting_record):
        registered_record_tags_of_meeting = (
            db.session.query(RecordTag)
            .filter(
                RecordTag.__table__.columns.issue_id
                == requested_meeting_record.get("issue_id")
            )
            .all()
        )
        try:
            for registered_record_tag_of_meeting in registered_record_tags_of_meeting:
                db.session.delete(registered_record_tag_of_meeting)
        except Exception as e:
            db.session.rollback()
            abort(400, e.args)
        db.session.commit()
        return registered_record_tags_of_meeting

    # レコードタグの単体削除
    def deleteRecordTag(requested_record_tag):
        registered_record_tag = (
            db.session.query(RecordTag)
            .filter(
                and_(
                    RecordTag.__table__.columns.issue_id
                    == requested_record_tag.get("issue_id"),
                    RecordTag.__table__.columns.tag_id
                    == requested_record_tag.get("tag_id"),
                )
            )
            .first()
        )
        try:
            db.session.delete(registered_record_tag)
        except Exception as e:
            db.session.rollback()
            abort(400, e.args)
        db.session.commit()
        return registered_record_tag


class RecordTagSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = RecordTag
        fields = (
            "issue_id",
            "tag_id",
        )
