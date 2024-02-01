from api.database import db, ma, metadata_obj


class Tag(db.Model):
    print(f"\ntagでのメタデータ{metadata_obj}\n")

    __table__ = metadata_obj.tables["tag"]

    def getTagList():
        # select * from users
        tag_list = db.session.query(Tag).all()
        if tag_list == None:
            return []
        else:
            return tag_list

    def registTag(tag):
        record = Tag(tag_id=tag.get("tag_id"), tag_name=tag.get("tag_name"))

        # insert into tag(tag_id, tag_name, speaker, speaker_yomi,speaker_role,speaker_group,speaker_position,speech_origin,speech_summary,speech_nanoda) values(...)
        db.session.add(record)
        db.session.commit()

        return tag


# class UserSchema(ma.SQLAlchemyAutoSchema):
#       class Meta:
#             model = User
#             load_instance = True


class TagSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tag
        fields = ("tag_id", "tag_name")


# class User:
#     __table__ = db.metadatas["auth"].tables["user"]
