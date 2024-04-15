FROM Python:3.8

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

# コンテナ起動時にapp.pyを実行
CMD ["python", "app.py"]
