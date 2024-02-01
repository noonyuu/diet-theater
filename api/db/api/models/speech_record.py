from api.database import db, ma, metadata_obj
from flask import abort
from sqlalchemy import and_


class SpeechRecord(db.Model):
    __table__ = metadata_obj.tables["speech_record"]

    # スピーチレコードの全件取得
    def getSpeechRecordAll():
        try:
            registered_speech_record_all = db.session.query(SpeechRecord).all()
        except Exception as e:
            db.session.rollback()
            abort(400, e.args)
        if registered_speech_record_all == None:
            return []
        else:
            return registered_speech_record_all

    # スピーチレコードの会議単位取得
    def getSpeechRecordsOfMeeting(requested_meeting_record):
        try:
            registered_speech_records_of_meeting = (
                db.session.query(SpeechRecord)
                .filter(
                    SpeechRecord.__table__.columns.issue_id
                    == requested_meeting_record.get("issue_id")
                )
                .all()
            )

        except Exception as e:
            db.session.rollback()
            abort(400, e.args)
        if registered_speech_records_of_meeting == None:
            return []
        else:
            return registered_speech_records_of_meeting

    # スピーチレコードの一件取得
    def getSpeechRecordOnce(requested_speech_record):
        try:
            registered_speech_record_once = (
                db.session.query(SpeechRecord)
                .filter(
                    and_(
                        SpeechRecord.__table__.columns.issue_id
                        == requested_speech_record.get("issue_id"),
                        SpeechRecord.__table__.columns.speech_id
                        == requested_speech_record.get("speech_id"),
                    )
                )
                .first()
            )
        except Exception as e:
            db.session.rollback()
            abort(400, e.args)
        if registered_speech_record_once == None:
            return None
        else:
            return registered_speech_record_once

    # スピーチレコードの登録
    def registSpeechRecord(requested_speech_record):
        try:
            registering_speech_record = SpeechRecord(
                issue_id=requested_speech_record.get("issue_id"),
                speech_id=requested_speech_record.get("speech_id"),
                speaker=requested_speech_record.get("speaker"),
                speaker_yomi=requested_speech_record.get("speaker_yomi"),
                speaker_role=requested_speech_record.get("speaker_role"),
                speaker_group=requested_speech_record.get("speaker_group"),
                speaker_position=requested_speech_record.get("speaker_position"),
                speech_origin=requested_speech_record.get("speech_origin"),
                speech_summary=requested_speech_record.get("speech_summary"),
                speech_nanoda=requested_speech_record.get("speech_nanoda"),
            )
            db.session.add(registering_speech_record)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(400, e.args)
        return registering_speech_record

    # スピーチレコードの更新
    def updateSpeechRecord(requested_speech_record):
        registered_speech_record = (
            db.session.query(SpeechRecord)
            .filter(
                and_(
                    SpeechRecord.__table__.columns.issue_id
                    == requested_speech_record.get("issue_id"),
                    SpeechRecord.__table__.columns.speech_id
                    == requested_speech_record.get("speech_id"),
                )
            )
            .first()
        )

        try:
            registered_speech_record.speaker = (requested_speech_record.get("speaker"),)
            registered_speech_record.speaker_yomi = (
                requested_speech_record.get("speaker_yomi"),
            )
            registered_speech_record.speaker_role = (
                requested_speech_record.get("speaker_role"),
            )
            registered_speech_record.speaker_group = (
                requested_speech_record.get("speaker_group"),
            )
            registered_speech_record.speaker_position = (
                requested_speech_record.get("speaker_position"),
            )
            registered_speech_record.speech_origin = (
                requested_speech_record.get("speech_origin"),
            )
            registered_speech_record.speech_summary = (
                requested_speech_record.get("speech_summary"),
            )
            registered_speech_record.speech_nanoda = (
                requested_speech_record.get("speech_nanoda"),
            )

        except Exception as e:
            db.session.rollback()
            abort(400, e.args)
        db.session.add(registered_speech_record)
        db.session.commit()
        return registered_speech_record

    # スピーチレコードの会議単位削除
    def deleteSpeechRecordOfMeeting(requested_meeting_record):
        registered_speech_records_of_meeting = (
            db.session.query(SpeechRecord)
            .filter(
                SpeechRecord.__table__.columns.issue_id
                == requested_meeting_record.get("issue_id")
            )
            .all()
        )
        try:
            for (
                registered_speech_record_of_meeting
            ) in registered_speech_records_of_meeting:
                db.session.delete(registered_speech_record_of_meeting)
        except Exception as e:
            db.session.rollback()
            abort(400, e.args)
        db.session.commit()
        return registered_speech_records_of_meeting

    # スピーチレコードの単体削除
    def deleteSpeechRecord(requested_speech_record):
        registered_speech_record = (
            db.session.query(SpeechRecord)
            .filter(
                and_(
                    SpeechRecord.__table__.columns.issue_id
                    == requested_speech_record.get("issue_id"),
                    SpeechRecord.__table__.columns.speech_id
                    == requested_speech_record.get("speech_id"),
                )
            )
            .first()
        )
        try:
            db.session.delete(registered_speech_record)
        except Exception as e:
            db.session.rollback()
            abort(400, e.args)
        db.session.commit()
        return registered_speech_record


class SpeechRecordSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SpeechRecord
        fields = (
            "issue_id",
            "speech_id",
            "speaker",
            "speaker_yomi",
            "speaker_role",
            "speaker_group",
            "speaker_position",
            "speech_origin",
            "speech_summary",
            "speech_nanoda",
        )
