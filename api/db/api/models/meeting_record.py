from api.database import db, ma, metadata_obj
from flask import abort
import datetime
from api.models import SpeechRecord, RecordTag


class MeetingRecord(db.Model):
    __table__ = metadata_obj.tables["meeting_record"]

    # 会議レコードの全件取得
    def getMeetingRecordAll():
        try:
            registered_meeting_record_all = db.session.query(MeetingRecord).all()
        except Exception as e:
            db.session.rollback()
            abort(400, e.args)
        if registered_meeting_record_all == None:
            return []
        else:
            return registered_meeting_record_all

    # 会議レコードの一件取得
    def getMeetingRecordOnce(requested_meeting_record):
        try:
            registered_meeting_record_once = (
                db.session.query(MeetingRecord)
                .filter(
                    MeetingRecord.__table__.columns.issue_id
                    == requested_meeting_record.get("issue_id")
                )
                .first()
            )
        except Exception as e:
            db.session.rollback()
            abort(400, e.args)
        if registered_meeting_record_once == None:
            return None
        else:
            return registered_meeting_record_once

    # 会議レコードの登録
    def registMeetingRecord(requested_meeting_record):
        try:
            registering_meeting_record = MeetingRecord(
                issue_id=requested_meeting_record.get("issue_id"),
                session=requested_meeting_record.get("session"),
                name_of_house=requested_meeting_record.get("name_of_house"),
                name_of_meeting=requested_meeting_record.get("name_of_meeting"),
                issue=requested_meeting_record.get("issue"),
                date=requested_meeting_record.get("date"),
                created_at=datetime.datetime.now(),
            )
            db.session.add(registering_meeting_record)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(400, e.args)
        return registering_meeting_record

    # 会議レコードの更新
    def updateMeetingRecord(requested_meeting_record):
        try:
            registered_meeting_record = (
                db.session.query(MeetingRecord)
                .filter(
                    MeetingRecord.__table__.columns.issue_id
                    == requested_meeting_record.get("issue_id")
                )
                .first()
            )
            try:
                registered_meeting_record.date = datetime.date.fromisoformat(
                    requested_meeting_record.get("date")
                )
            except Exception as e:
                raise ValueError("date format error!")
            registered_meeting_record.session = requested_meeting_record.get("session")
            registered_meeting_record.name_of_house = requested_meeting_record.get(
                "name_of_house"
            )
            registered_meeting_record.name_of_meeting = requested_meeting_record.get(
                "name_of_meeting"
            )
            registered_meeting_record.issue = requested_meeting_record.get("issue")
            registered_meeting_record.updated_at = datetime.datetime.now()
        except Exception as e:
            db.session.rollback()
            abort(400, e.args)
        db.session.add(registered_meeting_record)
        db.session.commit()
        return registered_meeting_record

    # 会議レコードの削除
    def deleteMeetingRecord(requested_meeting_record):
        registered_meeting_record = (
            db.session.query(MeetingRecord)
            .filter(
                MeetingRecord.__table__.columns.issue_id
                == requested_meeting_record.get("issue_id")
            )
            .first()
        )

        try:
            SpeechRecord.deleteSpeechRecordOfMeeting(requested_meeting_record)
            RecordTag.deleteRecordTagsOfMeeting(requested_meeting_record)
            registered_meeting_record.deleted_at = (datetime.datetime.now(),)
        except Exception as e:
            db.session.rollback()
            abort(400, e.args)
        db.session.add(registered_meeting_record)
        db.session.commit()
        return requested_meeting_record


class MeetingRecordSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = MeetingRecord
        fields = (
            "issue_id",
            "session",
            "name_of_house",
            "name_of_meeting",
            "issue",
            "date",
            "created_at",
            "updated_at",
            "deleted_at",
        )
