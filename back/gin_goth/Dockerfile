FROM golang:1.20.13-bullseye

WORKDIR /root/gin_goth

COPY go.mod go.sum ./
RUN go mod download
COPY . .

RUN go build -o main /root/gin_goth/main.go

CMD ["./main"]
