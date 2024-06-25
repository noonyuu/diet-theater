FROM golang:1.22.4

WORKDIR /root/app

RUN apt-get update && apt-get install -y postgresql-client

COPY go.mod go.sum ./
RUN go mod download
COPY . .

RUN go install github.com/cosmtrek/air@v1.40.4
# tblsをインストール
RUN go install github.com/k1LoW/tbls@latest

# GOPATH/binをPATHに追加
ENV PATH="/go/bin:${PATH}"

CMD ["make", "start"]
