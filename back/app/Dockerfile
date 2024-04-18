FROM golang:1.20.13-bullseye

WORKDIR /root/app

COPY go.mod go.sum ./
RUN go mod download
COPY . .

RUN go build -o main /root/app/main.go

CMD ["./main"]
