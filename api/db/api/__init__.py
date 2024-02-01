from flask import Flask, make_response, jsonify
from flask_cors import CORS
from api.database import db, init_db
import config


def create_app():
    app = Flask(__name__)

    # CORS対応
    CORS(app)

    # DB設定を読み込む
    app.config.from_object(config.Config)
    print(f"\n\n\nconfig.Configを表示します\n{config.Config}\n")
    # db.init_app(app)
    print(f"\ninit_dbします\n")
    with app.app_context():
        init_db(app)

    from .views.speech_record import speech_record_router
    from .views.record_tag import record_tag_router
    from .views.tag import tag_router
    from .views.meeting_record import meeting_record_router

    app.register_blueprint(speech_record_router, url_prefix="/api")
    app.register_blueprint(meeting_record_router, url_prefix="/api")
    app.register_blueprint(record_tag_router, url_prefix="/api")
    app.register_blueprint(tag_router, url_prefix="/api")

    return app


print(f"\ncreate_appします\n")
app = create_app()
