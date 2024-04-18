FROM golang:1.20.13-bullseye

WORKDIR /root/gin_goth

COPY . .

RUN go build -o main .

CMD ["./main"]
