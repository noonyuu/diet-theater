FROM golang:1.22.4
WORKDIR /root/gin_goth

RUN apt-get update && apt-get install -y postgresql-client

COPY go.mod go.sum ./
RUN go mod download
COPY . .

RUN go install github.com/cosmtrek/air@v1.40.4

CMD ["make", "start"]

