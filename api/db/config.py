class SystemConfig:
    # from dotenv import load_dotenv

    # load_dotenv()
    # import os

    # DB_USER = os.getenv("DB_USER")
    # PASSWORD = os.getenv("PASSWORD")
    # HOST = os.getenv("HOST")
    # DATABASE = os.getenv("DATABASE")

    # print(f"{DB_USER}\n{PASSWORD}\n{HOST}\n{DATABASE}")

    DEBUG = True

    # SQLALCHEMY_DATABASE_URI = (
    #     "mysql+pymysql://{DB_USER}:{PASSWORD}@{HOST}/{DATABASE}?charset=utf8"
    # )

    # ここのipアドレスをホストのipアドレスに変える
    SQLALCHEMY_DATABASE_URI = (
        "mysql+pymysql:/passなどは削除しています。"
    )


Config = SystemConfig
