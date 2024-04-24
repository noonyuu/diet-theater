FROM golang:1.21.3

WORKDIR /root/app

COPY go.mod go.sum ./
RUN go mod download
COPY . .

# RUN go build -o main /root/app/main.go

# CMD ["./main"]
