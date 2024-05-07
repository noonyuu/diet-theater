FROM python:3.8

WORKDIR /python

COPY . /python

RUN pip install -r requirements.txt

# コンテナ起動時にapp.pyを実行
CMD ["python"]
